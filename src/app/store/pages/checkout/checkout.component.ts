import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorService } from 'src/app/shared/validators/validator.service';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../../services/store.service';
import { Toaster } from 'ngx-toast-notifications';

declare global {
  interface Window {
    Stripe?: any;
  }
}
@Component({
  selector: 'app-checkout',
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
    private toaster: Toaster
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
          this.toaster.open({
            text: '🔴 Error con orden',
            caption: 'Ya se ha pagado',
          });
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
      console.log(e);
    }
  }

  async initPay(): Promise<any> {
    try {
      this.paymentForm.disable();
      //TODO: SDK de Stripe genera un TOKEN para la intencion de pago!
      const { token } = await this.STRIPE.createToken(this.cardNumber);

      //TODO: Enviamos el token a nuesta api donde generamos (stripe) un metodo de pago basado en el token
      //TODO: tok_23213
      const { data } = await this.store.sendPayment(token.id).toPromise();

      //TODO: Nuestra api devolver un "client_secret" que es un token unico por intencion de pago
      //TODO: SDK de stripe se encarga de verificar si el banco necesita autorizar o no
      this.STRIPE.handleCardPayment(data.client_secret)
        .then(async () => {
          //TODO: 👌 Money Money!!!
          this.toaster.open({
            text: 'Dinerito dineron',
            caption: 'Yeah!',
            type: 'success',
          });

          //TODO: Enviamos el id "localizador" de nuestra orden para decirle al backend que confirme con stripe si es verdad!
          // await this.restService.confirmOrder(this.id)
        })
        .catch(() => {
          this.toaster.open('Error con el pago');
        });
    } catch (e) {
      this.toaster.open({
        text: 'Algo ocurrio mientras procesaba el pago',
        caption: 'ERROR',
        type: 'danger',
      });
    }
  }
}
