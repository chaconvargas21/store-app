import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _user!: User;

  get user() {
    return { ...this._user };
  }

  constructor(private http: HttpClient) {}

  // El backend responde { msg } (email duplicado, credenciales incorrectas) o,
  // si falla express-validator, { errors: { campo: { msg } } }.
  private errorMessage(err: any): string {
    const body = err?.error;
    if (body?.msg) return body.msg;
    const firstError: any = body?.errors && Object.values(body.errors)[0];
    return firstError?.msg || 'No se pudo conectar con el servidor';
  }

  // Devuelve true si salió bien, o el mensaje de error (string) si no.
  signup(name: string, email: string, password: string): Observable<true | string> {
    const url = `${this.baseUrl}/auth/new`;
    const body = {
      name,
      email,
      password,
    };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap(({ ok, token }) => {
        if (ok) {
          localStorage.setItem('token', token!);
        }
      }),
      map(() => true as const),
      catchError((err) => of(this.errorMessage(err)))
    );
  }

  // Devuelve true si salió bien, o el mensaje de error (string) si no.
  login(email: string, password: string): Observable<true | string> {
    const url = `${this.baseUrl}/auth`;
    const body = {
      email,
      password,
    };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap(({ ok, token }) => {
        if (ok) {
          localStorage.setItem('token', token!);
        }
      }),
      map(() => true as const),
      catchError((err) => of(this.errorMessage(err)))
    );
  }

  validateToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    return this.http.get<AuthResponse>(url, {headers}).pipe(
      map((resp)=> {
        localStorage.setItem('token', resp.token!);
        this._user = {
          name: resp.name!,
          uid: resp.uid!,
          email: resp.email!
        }
        return resp.ok;
      }),
      catchError((err)=> of(false))
    );
  }

  logout() {
    localStorage.clear();
  }
}
