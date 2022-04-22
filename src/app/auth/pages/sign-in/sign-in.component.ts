import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ValidatorService } from 'src/app/shared/validators/validator.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private validator: ValidatorService,
    private router: Router
  ) {}

  signInForm: FormGroup = this.fb.group(
    {
      email: [
        '',
        [Validators.required, Validators.pattern(this.validator.emailPattern)],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validator.firstLastNamePattern),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validator.firstLastNamePattern),
        ],
      ],
      phoneNumber: ['', Validators.required],
      company: ['', Validators.required],
    },
    {
      validators: [this.validator.equalsFields('password', 'password2')],
    }
  );

  get email() {
    return this.signInForm.get('email');
  }
  get password() {
    return this.signInForm.get('password');
  }
  get password2() {
    return this.signInForm.get('password2');
  }
  get firstName() {
    return this.signInForm.get('firstName');
  }
  get lastName() {
    return this.signInForm.get('lastName');
  }
  get phoneNumber() {
    return this.signInForm.get('phoneNumber');
  }
  get company() {
    return this.signInForm.get('company');
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
    } else {
      localStorage.setItem('email', this.email?.value);
      localStorage.setItem('password', this.password?.value);
      this.router.navigate(['/login']);
    }
  }
}
