import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorService } from 'src/app/shared/validators/validator.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  informationForm: FormGroup = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.pattern(this.validator.emailPattern)],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private validator: ValidatorService, private fb: FormBuilder) {}

  ngOnInit(): void {}
}
