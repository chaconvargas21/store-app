import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorService } from 'src/app/shared/validators/validator.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private validator: ValidatorService, private auth:AuthService, private router: Router) {}

  loginForm: FormGroup = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.pattern(this.validator.emailPattern)],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {}

  onSubmit() {
    this.auth.login(this.email?.value,this.password?.value),
    this.router.navigate(["./shared"])
  }
}
