import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ValidatorService } from 'src/app/shared/validators/validator.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

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
    private router: Router
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

  invalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!control && control.invalid && control.touched;
  }

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
          Swal.fire('Error', ok, 'error');
        }
      });
  }
}
