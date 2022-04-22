import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth: any;
  get auth() {
    return { ...this._auth };
  }
  constructor() {}

  login(email: string, password: string) {
    const _email = localStorage.getItem('email');
    const _password = localStorage.getItem('password');
    console.log(email, _email);
    console.log(password, _password);
    if (email === _email && password === _password)
      this._auth = {
        email: _email,
        password: _password,
      };
  }
}
