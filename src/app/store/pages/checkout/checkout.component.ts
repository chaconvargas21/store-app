import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorService } from 'src/app/shared/validators/validator.service';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StoreService } from '../../services/store.service';
import { MatSnackBar } from '@angular/material/snack-bar';

declare global {
  interface Window {
    Stripe?: any;
  }
}
@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  private readonly STRIPE!: any;
  private elementsStripe!: any;
  cardNumber: any;
  cardCvc: any;
  cardExpiry: any;
  infoForm: FormGroup = new FormGroup({});
  paymentForm: FormGroup = new FormGroup({});
  id!: string;
  orderData!: any;

  constructor(
    private validator: ValidatorService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: StoreService,
    private snackBar: MatSnackBar
  ) {
    this.STRIPE = window.Stripe(environment.stripe_pk);
  }

  ngOnInit() {
    this.infoForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      receipt_email: [
        '',
        [Validators.required, Validators.pattern(this.validator.emailPattern)],
      ],
      shipping: this.fb.group({
        address: this.fb.group({
          city: [''],
          country: [''],
          state: [''],
          postal_code: [''],
          line1: [''],
          line2: [''],
        }),
        name: [''],
        carrier: [''],
        phone: [''],
      }),
    });

    this.paymentForm = this.fb.group({
      cardNumber: [false, [Validators.required, Validators.requiredTrue]],
      cardCvc: [false, [Validators.required, Validators.requiredTrue]],
      cardExpiry: [false, [Validators.required, Validators.requiredTrue]],
    });
    this.loadDetail();
  }

  private createStripeElement = () => {
    const style = {
      base: {
        color: '#000000',
        fontWeight: 400,
        fontFamily: "'Poppins', sans-serif",
        fontSize: '20px',
        '::placeholder': {
          color: '#E3E2EC',
        },
      },
      invalid: {
        color: '#dc3545',
      },
    };
    this.elementsStripe = this.STRIPE.elements({});

    const cardNumber = this.elementsStripe.create('cardNumber', {
      placeholder: '4242 4242 4242 4242',
      style,
      classes: {
        base: 'input-stripe-custom',
      },
    });
    const cardExpiry = this.elementsStripe.create('cardExpiry', {
      placeholder: 'MM/AA',
      style,
      classes: {
        base: 'input-stripe-custom',
      },
    });
    const cardCvc = this.elementsStripe.create('cardCvc', {
      placeholder: '000',
      style,
      classes: {
        base: 'input-stripe-custom',
      },
    });

    cardNumber.mount('#cardNumber');
    cardCvc.mount('#cardCvc');
    cardExpiry.mount('#cardExpiry');

    this.cardNumber = cardNumber;
    this.cardCvc = cardCvc;
    this.cardExpiry = cardExpiry;

    this.cardNumber.addEventListener('change', this.onChangeCard.bind(this));
    this.cardCvc.addEventListener('change', this.onChangeCvc.bind(this));
    this.cardExpiry.addEventListener('change', this.onChangeExp.bind(this));
  };

  onChangeCard({ error }: any) {
    this.paymentForm.patchValue({ cardNumber: !error });
  }

  onChangeCvc({ error }: any) {
    this.paymentForm.patchValue({ cardCvc: !error });
  }

  onChangeExp({ error }: any) {
    this.paymentForm.patchValue({ cardExpiry: !error });
  }

  async loadDetail() {
    try {
      const { order } = await this.store.getOrder().toPromise();
      if (order) {
        const { status } = await this.store.confirmOrder().toPromise();
        if (status.includes('succe')) {
          this.paymentForm.disable();
          this.notify('🔴 Error con orden: ya se ha pagado');
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async newOrder() {
    try {
      this.infoForm.disable();
      await this.store.postOrder(this.infoForm.value).toPromise();
      this.createStripeElement();
    } catch (e) {
      this.infoForm.enable();
      const expired = e instanceof HttpErrorResponse && e.status === 401;
      this.notify(
        expired ? 'Iniciá sesión para pagar' : 'No se pudo iniciar el checkout',
        'danger'
      );
    }
  }

  // El backend confirma el pago en la misma llamada (PaymentIntent con
  // confirm: true): responde 200 si Stripe cobro y 402 si la tarjeta fue
  // rechazada. Stripe.js solo tokeniza la tarjeta.
  async initPay(): Promise<any> {
    this.paymentForm.disable();

    const { token, error } = await this.STRIPE.createToken(this.cardNumber);
    if (error) {
      this.paymentForm.enable();
      this.notify(error.message, 'danger');
      return;
    }

    try {
      const { data } = await this.store.sendPayment(token.id).toPromise();
      if (data.status === 'succeeded') {
        this.notify('Pago realizado. ¡Gracias por tu compra!', 'success');
      }
    } catch (e) {
      const status = e instanceof HttpErrorResponse ? e.status : 0;
      if (status === 402) {
        // El carrito se conserva en el backend: se puede reintentar con otra tarjeta.
        this.paymentForm.enable();
        this.notify('Tarjeta rechazada. Probá con otra tarjeta', 'danger');
        return;
      }
      this.notify(
        status === 401
          ? 'Tu sesión expiró, volvé a iniciar sesión'
          : 'Algo ocurrio mientras procesaba el pago',
        'danger'
      );
    }
  }

  private notify(message: string, type?: 'success' | 'danger') {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: type ? `snackbar-${type}` : undefined,
    });
  }
}
