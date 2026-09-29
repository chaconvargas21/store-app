import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ValidatorService } from 'src/app/shared/validators/validator.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SidebarCheckoutComponent } from 'src/app/shared/components/sidebar-checkout/sidebar-checkout.component';
import { environment } from '../../../../environments/environment';
import { StoreService } from '../../services/store.service';
import { PostOrderPayload } from '../../interfaces/order.interface';
// Solo tipos: Stripe.js se carga desde js.stripe.com en index.html (Stripe
// exige que no se empaquete), y el paquete declara `window.Stripe`.
import type {
  Stripe,
  StripeCardCvcElement,
  StripeCardExpiryElement,
  StripeCardNumberElement,
  StripeElementChangeEvent,
} from '@stripe/stripe-js';

type Step = 'datos' | 'entrega' | 'pago';
type CardField = 'cardNumber' | 'cardExpiry' | 'cardCvc';

// Departamentos del Perú (más la Provincia Constitucional del Callao).
const DEPARTMENTS = [
  'Amazonas', 'Áncash', 'Apurímac', 'Arequipa', 'Ayacucho', 'Cajamarca', 'Callao',
  'Cusco', 'Huancavelica', 'Huánuco', 'Ica', 'Junín', 'La Libertad', 'Lambayeque',
  'Lima', 'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura', 'Puno',
  'San Martín', 'Tacna', 'Tumbes', 'Ucayali',
];

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  // static: true porque el sidebar no está dentro de un *ngIf: queda disponible
  // desde ngOnInit y `cartEmpty` lo puede leer en el primer render.
  @ViewChild(SidebarCheckoutComponent, { static: true }) sidebar?: SidebarCheckoutComponent;

  private readonly STRIPE: Stripe;
  // createToken necesita solo el campo del número: Stripe junta los tres
  // campos montados con el mismo `elements`.
  private cardNumber!: StripeCardNumberElement;

  departments = DEPARTMENTS;
  step: Step = 'datos';
  savingDelivery = false;
  paying = false;
  paid = false;
  // Una orden anterior de la sesión ya está pagada: no se puede volver a pagar
  // hasta que postOrder arranque un checkout nuevo.
  paymentBlocked = false;

  contactForm!: FormGroup;
  deliveryForm!: FormGroup;
  paymentForm!: FormGroup;

  // Los campos de Stripe viven en iframes: su estado llega por eventos `change`.
  private cardState: Record<CardField, boolean> = { cardNumber: false, cardExpiry: false, cardCvc: false };
  cardErrors: Partial<Record<CardField, string>> = {};

  get cardComplete(): boolean {
    return Object.values(this.cardState).every(Boolean);
  }

  // Sin productos no hay nada que pagar: se muestra un aviso en lugar de los pasos.
  get cartEmpty(): boolean {
    return !!this.sidebar?.loaded && !this.sidebar.items.length;
  }

  get fullName(): string {
    const { firstName, lastName } = this.deliveryForm.value;
    return `${firstName.trim()} ${lastName.trim()}`;
  }

  // Address no tiene campo de distrito: va junto con la provincia en `city`.
  get cityLine(): string {
    const { district, province } = this.deliveryForm.value;
    return `${district.trim()}, ${province.trim()}`;
  }

  constructor(
    private validator: ValidatorService,
    private fb: FormBuilder,
    private store: StoreService,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {
    // window.Stripe existe si cargó el <script> de index.html.
    this.STRIPE = window.Stripe!(environment.stripe_pk);
  }

  ngOnInit() {
    this.contactForm = this.fb.group({
      // authGuard ya validó el token y dejó el usuario en AuthService.
      receipt_email: [
        this.auth.user.email ?? '',
        [Validators.required, Validators.pattern(this.validator.emailPattern)],
      ],
    });

    const [firstName = '', ...rest] = (this.auth.user.name ?? '').trim().split(/\s+/);
    this.deliveryForm = this.fb.group({
      firstName: [firstName, [Validators.required, Validators.pattern(this.validator.namePattern)]],
      lastName: [rest.join(' '), [Validators.required, Validators.pattern(this.validator.namePattern)]],
      // Celular peruano: 9 dígitos empezando por 9 (el +51 se agrega al enviar).
      phone: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)]],
      line1: ['', [Validators.required, notBlank]],
      line2: [''],
      state: ['', Validators.required],
      province: ['', [Validators.required, notBlank]],
      district: ['', [Validators.required, notBlank]],
      // Opcional; los códigos postales del Perú tienen 5 dígitos.
      postal_code: ['', Validators.pattern(/^\d{5}$/)],
    });

    this.paymentForm = this.fb.group({
      cardHolder: ['', [Validators.required, notBlank]],
    });

    this.loadDetail();
  }

  // Los contenedores #cardNumber/#cardExpiry/#cardCvc tienen que existir en el
  // DOM para montar los iframes de Stripe; por eso el paso de pago usa [hidden].
  ngAfterViewInit() {
    this.createStripeElements();
  }

  // Para el template: marca el campo en rojo solo después de que el usuario lo tocó.
  invalid(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return !!control && control.invalid && control.touched;
  }

  // Vuelve a un paso anterior del acordeón (los datos ya cargados se conservan).
  goTo(step: Step) {
    this.step = step;
  }

  // Paso 1 → 2: solo valida el email; todavía no se llama al backend.
  submitContact() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.step = 'entrega';
    this.prefillCardHolder();
  }

  // Guarda el staging de la orden (POST /api/order) y recién ahí habilita el pago.
  async submitDelivery() {
    if (this.deliveryForm.invalid) {
      this.deliveryForm.markAllAsTouched();
      return;
    }
    const d = this.deliveryForm.value;
    const payload: PostOrderPayload = {
      firstName: d.firstName.trim(),
      lastName: d.lastName.trim(),
      receipt_email: this.contactForm.value.receipt_email,
      // Va tal cual al `shipping` del PaymentIntent de Stripe: `name` es el
      // destinatario y `address.country` un código ISO de dos letras.
      shipping: {
        name: this.fullName,
        phone: `+51 ${d.phone}`,
        address: {
          country: 'PE',
          state: d.state,
          city: this.cityLine,
          postal_code: d.postal_code,
          line1: d.line1.trim(),
          line2: d.line2.trim(),
        },
      },
    };

    this.savingDelivery = true;
    try {
      await this.store.postOrder(payload).toPromise();
      // postOrder reemplaza la orden de la sesión por un checkout nuevo.
      this.paymentBlocked = false;
      this.step = 'pago';
      this.prefillCardHolder();
    } catch (e) {
      const expired = e instanceof HttpErrorResponse && e.status === 401;
      this.notify(expired ? 'Iniciá sesión para pagar' : 'No se pudo guardar la dirección', 'danger');
    } finally {
      this.savingDelivery = false;
    }
  }

  // Propone el nombre del destinatario como titular, sin pisar lo que el usuario escribió.
  private prefillCardHolder() {
    const holder = this.paymentForm.get('cardHolder')!;
    if (!holder.value && this.deliveryForm.valid) holder.setValue(this.fullName);
  }

  // Crea y monta los tres campos de tarjeta (iframes de Stripe) con el estilo
  // de los inputs de la app, y registra su estado de validación.
  private createStripeElements() {
    const style = {
      base: {
        color: '#111111',
        fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: '14px',
        '::placeholder': { color: '#6b7280' },
      },
      invalid: { color: '#b91c1c' },
    };
    const fonts = [{ cssSrc: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap' }];
    const elements = this.STRIPE.elements({ fonts, locale: 'es' });

    const fields: Record<CardField, StripeCardNumberElement | StripeCardExpiryElement | StripeCardCvcElement> = {
      cardNumber: elements.create('cardNumber', { style, placeholder: '0000 0000 0000 0000', showIcon: true }),
      cardExpiry: elements.create('cardExpiry', { style, placeholder: 'MM/AA' }),
      cardCvc: elements.create('cardCvc', { style, placeholder: '000' }),
    };

    (Object.keys(fields) as CardField[]).forEach((name) => {
      fields[name].mount(`#${name}`);
      // El `on` de cada tipo de campo es una sobrecarga distinta; el evento
      // `change` de los tres comparte la forma de StripeElementChangeEvent.
      (fields[name] as StripeCardNumberElement).on('change', ({ complete, error }: StripeElementChangeEvent) => {
        this.cardState[name] = complete;
        this.cardErrors = { ...this.cardErrors, [name]: error?.message };
      });
    });
    this.cardNumber = fields.cardNumber as StripeCardNumberElement;
  }

  // Al entrar al checkout: si la orden de la sesión ya se cobró, bloquea el
  // pago para no cobrar dos veces (hasta que postOrder arranque otra orden).
  async loadDetail() {
    try {
      // Solo una orden ya cobrada tiene stripeId; el staging de postOrder no,
      // y /order/confirm respondería 500 sin él.
      const { order } = (await this.store.getOrder().toPromise())!;
      if (order?.stripeId) {
        const { status } = (await this.store.confirmOrder().toPromise())!;
        if (status === 'succeeded') {
          this.paymentBlocked = true;
          this.notify('La orden de esta sesión ya fue pagada', 'danger');
        }
      }
    } catch {
      // getOrder y confirmOrder ya devuelven un valor por defecto si falla la
      // request; si igual falla, el pago simplemente no queda bloqueado.
    }
  }

  // El backend confirma el pago en la misma llamada (PaymentIntent con
  // confirm: true): responde 200 si Stripe cobró y 402 si la tarjeta fue
  // rechazada. Stripe.js solo tokeniza la tarjeta.
  async initPay(): Promise<void> {
    if (this.paymentForm.invalid || !this.cardComplete) {
      this.paymentForm.markAllAsTouched();
      return;
    }
    this.paying = true;

    const { token, error } = await this.STRIPE.createToken(this.cardNumber, {
      name: this.paymentForm.value.cardHolder.trim(),
    });
    if (error || !token) {
      this.paying = false;
      this.notify(error?.message ?? 'No se pudo validar la tarjeta', 'danger');
      return;
    }

    try {
      const { data } = (await this.store.sendPayment(token.id).toPromise())!;
      if (data.status === 'succeeded') {
        this.paid = true;
        this.sidebar?.getItemsShoppingCart();
        this.notify('Pago realizado', 'success');
      }
    } catch (e) {
      const status = e instanceof HttpErrorResponse ? e.status : 0;
      if (status === 402) {
        // El carrito se conserva en el backend: se puede reintentar con otra tarjeta.
        this.notify('Tarjeta rechazada. Probá con otra tarjeta', 'danger');
      } else if (status === 409) {
        // La orden ya fue pagada o hay otro intento en curso: no reintentar.
        const message = e instanceof HttpErrorResponse ? e.error?.error : null;
        this.paymentBlocked = true;
        this.notify(message || 'La orden ya está en proceso de pago', 'danger');
      } else {
        // 500: reintentar es seguro (el backend escribe la orden antes de
        // cobrar, reembolsa si no pudo registrar el pago y responde 409 si ya
        // se pagó).
        this.notify(
          status === 401 ? 'Tu sesión expiró, volvé a iniciar sesión' : 'Algo ocurrió mientras procesábamos el pago',
          'danger'
        );
      }
    } finally {
      this.paying = false;
    }
  }

  // Snackbar de feedback; `type` elige el color (clases globales de styles.scss).
  private notify(message: string, type?: 'success' | 'danger') {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: type ? `snackbar-${type}` : undefined,
    });
  }
}

// Rechaza textos que son solo espacios (Validators.required los deja pasar).
function notBlank(control: AbstractControl) {
  return typeof control.value === 'string' && !control.value.trim() ? { blank: true } : null;
}
