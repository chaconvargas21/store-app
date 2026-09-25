import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ValidatorService } from 'src/app/shared/validators/validator.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

// Reglas de la contraseña: se muestran como checklist y también validan el form.
const PASSWORD_RULES = [
  { label: 'Mínimo 8 caracteres', test: (v: string) => v.length >= 8 },
  { label: 'Una letra mayúscula', test: (v: string) => /[A-ZÁÉÍÓÚÑ]/.test(v) },
  { label: 'Un número', test: (v: string) => /\d/.test(v) },
];

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrls: ['../auth-page.scss'],
})
export class SignInComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private validator: ValidatorService,
    private router: Router,
    private auth: AuthService
  ) {}

  signInForm!: FormGroup;
  showPassword = false;
  submitting = false;

  get email() {
    return this.signInForm.get('email');
  }
  get password() {
    return this.signInForm.get('password');
  }
  get firstName() {
    return this.signInForm.get('firstName');
  }
  get lastName() {
    return this.signInForm.get('lastName');
  }

  get passwordRules() {
    const value: string = this.password?.value ?? '';
    return PASSWORD_RULES.map((r) => ({ label: r.label, met: r.test(value) }));
  }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      firstName: [
        '',
        [Validators.required, Validators.pattern(this.validator.namePattern)],
      ],
      lastName: [
        '',
        [Validators.required, Validators.pattern(this.validator.namePattern)],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(this.validator.emailPattern)],
      ],
      password: [
        '',
        [
          Validators.required,
          (control: AbstractControl) =>
            PASSWORD_RULES.every((r) => r.test(control.value ?? ''))
              ? null
              : { weakPassword: true },
        ],
      ],
    });
  }

  invalid(field: string): boolean {
    const control = this.signInForm.get(field);
    return !!control && control.invalid && control.touched;
  }

  signIn() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }
    // store-back guarda un solo `name`: se manda nombre y apellido juntos.
    const name = `${this.firstName?.value.trim()} ${this.lastName?.value.trim()}`;
    this.submitting = true;
    this.auth
      .signup(name, this.email?.value, this.password?.value)
      .pipe(finalize(() => (this.submitting = false)))
      .subscribe((ok) => {
        if (ok === true) {
          this.router.navigateByUrl('/store');
        } else {
          Swal.fire('Error', ok, 'error');
        }
      });
  }
}
