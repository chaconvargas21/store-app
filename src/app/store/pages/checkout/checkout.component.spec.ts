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
});
