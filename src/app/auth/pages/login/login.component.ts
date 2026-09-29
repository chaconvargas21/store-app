import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ValidatorService } from 'src/app/shared/validators/validator.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['../auth-page.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private validator: ValidatorService,
    private auth: AuthService,
    private router: Router,
    private notification: NotificationService
  ) {}

  loginForm!: FormGroup;
  showPassword = false;
  submitting = false;

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.pattern(this.validator.emailPattern)],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Para el template: marca el campo en rojo solo después de que el usuario lo tocó.
  invalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!control && control.invalid && control.touched;
  }

  // Si el login sale bien, AuthService ya guardó el token: vuelve a la tienda.
  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.auth
      .login(this.email?.value, this.password?.value)
      .pipe(finalize(() => (this.submitting = false)))
      .subscribe((ok) => {
        if (ok === true) {
          this.router.navigateByUrl('/store');
        } else {
          // `ok` es el mensaje de error del backend (ver AuthService.errorMessage).
          this.notification.danger(ok);
        }
      });
  }
}
