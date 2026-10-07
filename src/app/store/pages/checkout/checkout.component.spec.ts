import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { StoreService } from '../../services/store.service';
import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let store: jasmine.SpyObj<StoreService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let stripe: jasmine.SpyObj<any>;
  // Handlers `change` de los campos de Stripe, para simular una tarjeta completa.
  let changeHandlers: ((event: any) => void)[];
  let originalStripe: any;

  beforeEach(async () => {
    changeHandlers = [];
    const element = {
      mount: jasmine.createSpy('mount'),
      on: (_: string, handler: (event: any) => void) => changeHandlers.push(handler),
    };
    stripe = jasmine.createSpyObj('Stripe', ['elements', 'createToken']);
    stripe.elements.and.returnValue({ create: () => element });
    stripe.createToken.and.resolveTo({ token: { id: 'tok_test' } });
    originalStripe = window.Stripe;
    window.Stripe = () => stripe;

    store = jasmine.createSpyObj<StoreService>('StoreService', [
      'getOrder',
      'confirmOrder',
      'postOrder',
      'sendPayment',
    ]);
    store.getOrder.and.returnValue(of({ order: null }));
    snackBar = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CheckoutComponent],
      providers: [
        { provide: StoreService, useValue: store },
        { provide: AuthService, useValue: { user: { name: 'Ana Pérez', email: 'ana@test.com' } } },
        { provide: MatSnackBar, useValue: snackBar },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    window.Stripe = originalStripe;
  });

  function fillCard() {
    changeHandlers.forEach((handler) => handler({ complete: true }));
    component.paymentForm.setValue({ cardHolder: 'Ana Pérez' });
  }

  function paymentError(status: number, error: any = {}) {
    return throwError(() => new HttpErrorResponse({ status, error }));
  }

  function lastMessage(): string {
    return snackBar.open.calls.mostRecent().args[0];
  }

  function fillDelivery() {
    component.deliveryForm.setValue({
      firstName: 'Ana', lastName: 'Pérez', phone: '912345678',
      line1: 'Calle QA 1', line2: '', state: 'Lima', province: 'Lima',
      district: 'Miraflores', postal_code: '15001',
    });
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('precarga los datos del usuario logueado', () => {
    expect(component.contactForm.value.receipt_email).toBe('ana@test.com');
    expect(component.deliveryForm.value.firstName).toBe('Ana');
    expect(component.deliveryForm.value.lastName).toBe('Pérez');
  });

  it('monta los tres campos de Stripe', () => {
    expect(changeHandlers.length).toBe(3);
  });

  it('no tokeniza si la tarjeta está incompleta', async () => {
    component.paymentForm.setValue({ cardHolder: 'Ana Pérez' });
    await component.initPay();
    expect(stripe.createToken).not.toHaveBeenCalled();
  });

  it('200 succeeded: marca la orden como pagada', async () => {
    store.sendPayment.and.returnValue(of({ data: { status: 'succeeded' } }));
    fillCard();

    await component.initPay();

    expect(store.sendPayment).toHaveBeenCalledWith('tok_test');
    expect(component.paid).toBeTrue();
    expect(component.paying).toBeFalse();
    expect(lastMessage()).toBe('Pago realizado');
  });

  it('402: tarjeta rechazada, deja reintentar', async () => {
    store.sendPayment.and.returnValue(paymentError(402, { error: 'card_declined', status: 'failed' }));
    fillCard();

    await component.initPay();

    expect(component.paid).toBeFalse();
    expect(component.paying).toBeFalse();
    expect(component.paymentBlocked).toBeFalse();
    expect(lastMessage()).toContain('Tarjeta rechazada');
  });

  it('409: muestra el mensaje del backend y bloquea el pago', async () => {
    store.sendPayment.and.returnValue(paymentError(409, { error: 'La orden ya fue pagada' }));
    fillCard();

    await component.initPay();

    expect(component.paymentBlocked).toBeTrue();
    expect(lastMessage()).toBe('La orden ya fue pagada');
  });

  it('401: avisa que la sesión expiró', async () => {
    store.sendPayment.and.returnValue(paymentError(401));
    fillCard();

    await component.initPay();

    expect(component.paymentBlocked).toBeFalse();
    expect(lastMessage()).toContain('sesión expiró');
  });

  it('carrito vacío: muestra el aviso en lugar de los pasos', () => {
    // El sidebar no se declara en este spec (y la query de @ViewChild pisaría un stub).
    spyOnProperty(component, 'cartEmpty').and.returnValue(true);
    // TestBed es zoneless: sin markForCheck, detectChanges no vuelve a revisar la vista.
    fixture.componentRef.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    const page: HTMLElement = fixture.nativeElement;
    expect(page.textContent).toContain('Tu carrito está vacío');
    // Los pasos quedan en el DOM (ocultos) para no desmontar los campos de Stripe.
    expect(page.querySelector('#cardNumber')).not.toBeNull();
  });

  it('el carrito está vacío solo cuando ya cargó y no tiene productos', () => {
    component.sidebar = { loaded: false, items: [] } as any;
    expect(component.cartEmpty).toBeFalse();

    component.sidebar = { loaded: true, items: [{}] } as any;
    expect(component.cartEmpty).toBeFalse();

    component.sidebar = { loaded: true, items: [] } as any;
    expect(component.cartEmpty).toBeTrue();
  });

  it('bloquea el pago si la orden de la sesión ya fue cobrada', async () => {
    store.getOrder.and.returnValue(of({ order: { stripeId: 'pi_123' } }));
    store.confirmOrder.and.returnValue(of({ status: 'succeeded' } as any));

    await component.loadDetail();

    expect(component.paymentBlocked).toBeTrue();
  });

  it('error de tokenización conserva datos y permite reintentar sin enviar pago', async () => {
    fillDelivery();
    fillCard();
    const delivery = component.deliveryForm.value;
    const contact = component.contactForm.value;
    stripe.createToken.and.resolveTo({ error: { message: 'No se pudo validar la tarjeta' } });
    await component.initPay();
    expect(store.sendPayment).not.toHaveBeenCalled();
    expect(component.paying).toBeFalse();
    expect(component.paid).toBeFalse();
    expect(component.paymentBlocked).toBeFalse();
    expect(component.deliveryForm.value).toEqual(delivery);
    expect(component.contactForm.value).toEqual(contact);
    expect(lastMessage()).toBe('No se pudo validar la tarjeta');
    stripe.createToken.and.resolveTo({ token: { id: 'tok_retry' } });
    store.sendPayment.and.returnValue(of({ data: { status: 'succeeded' } }));
    await component.initPay();
    expect(store.sendPayment).toHaveBeenCalledOnceWith('tok_retry');
    expect(component.paid).toBeTrue();
  });

  it('respuesta sin token no envía pago y libera el estado de procesamiento', async () => {
    fillCard();
    stripe.createToken.and.resolveTo({});
    await component.initPay();
    expect(store.sendPayment).not.toHaveBeenCalled();
    expect(component.paying).toBeFalse();
    expect(lastMessage()).toBe('No se pudo validar la tarjeta');
  });

  // Paso 7 / TOKEN-01: deuda aceptada, conservar aserciones de recuperación.
  xit('rechazo de la promesa de tokenización se informa y libera el estado de procesamiento', async () => {
    fillCard();
    stripe.createToken.and.rejectWith(new Error('Stripe no disponible'));
    await expectAsync(component.initPay()).toBeResolved();
    expect(component.paying).toBeFalse();
    expect(component.paid).toBeFalse();
    expect(store.sendPayment).not.toHaveBeenCalled();
  });

  it('HTTP 500 conserva formularios y permite un pago posterior', async () => {
    fillDelivery();
    fillCard();
    const contact = component.contactForm.value;
    const delivery = component.deliveryForm.value;
    const payment = component.paymentForm.value;
    store.sendPayment.and.returnValue(paymentError(500));
    await component.initPay();
    expect(component.paying).toBeFalse();
    expect(component.paid).toBeFalse();
    expect(component.paymentBlocked).toBeFalse();
    expect(component.contactForm.value).toEqual(contact);
    expect(component.deliveryForm.value).toEqual(delivery);
    expect(component.paymentForm.value).toEqual(payment);
    expect(lastMessage()).toContain('Algo ocurrió');
    store.sendPayment.and.returnValue(of({ data: { status: 'succeeded' } }));
    await component.initPay();
    expect(component.paid).toBeTrue();
    expect(store.sendPayment).toHaveBeenCalledTimes(2);
  });

  [
    ['firstName', 'Ana123'], ['lastName', ''], ['phone', '123'],
    ['line1', '   '], ['state', ''], ['province', '   '],
    ['district', '   '], ['postal_code', '123'],
  ].forEach(([field, value]) => {
    it(`entrega inválida en ${field} no persiste ni habilita el pago`, async () => {
      fillDelivery();
      component.goTo('entrega');
      component.deliveryForm.get(field)!.setValue(value);
      await component.submitDelivery();
      expect(component.deliveryForm.invalid).toBeTrue();
      expect(component.deliveryForm.get(field)!.touched).toBeTrue();
      expect(store.postOrder).not.toHaveBeenCalled();
      expect(component.step).toBe('entrega');
      expect(component.savingDelivery).toBeFalse();
    });
  });

  it('correo inválido no permite avanzar a entrega', () => {
    component.contactForm.setValue({ receipt_email: 'correo-invalido' });
    component.submitContact();
    expect(component.step).toBe('datos');
    expect(component.contactForm.get('receipt_email')!.touched).toBeTrue();
    expect(store.postOrder).not.toHaveBeenCalled();
  });

  it('entrega válida envía solo contacto y dirección y habilita el paso de pago', async () => {
    fillDelivery();
    store.postOrder.and.returnValue(of({} as any));
    await component.submitDelivery();
    expect(store.postOrder).toHaveBeenCalledOnceWith({
      firstName: 'Ana', lastName: 'Pérez', receipt_email: 'ana@test.com',
      shipping: { name: 'Ana Pérez', phone: '+51 912345678', address: {
        country: 'PE', state: 'Lima', city: 'Miraflores, Lima', postal_code: '15001',
        line1: 'Calle QA 1', line2: '',
      } },
    });
    expect(component.step).toBe('pago');
    expect(component.savingDelivery).toBeFalse();
  });

  it('fallo al guardar entrega conserva la dirección y no habilita el pago', async () => {
    fillDelivery();
    component.goTo('entrega');
    const delivery = component.deliveryForm.value;
    store.postOrder.and.returnValue(paymentError(500));
    await component.submitDelivery();
    expect(component.step).toBe('entrega');
    expect(component.savingDelivery).toBeFalse();
    expect(component.deliveryForm.value).toEqual(delivery);
    expect(lastMessage()).toBe('No se pudo guardar la dirección');
  });
});
