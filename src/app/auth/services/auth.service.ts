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
  // Clave del JWT en localStorage; solo este servicio la conoce.
  private static readonly TOKEN_KEY = 'token';
  private baseUrl: string = environment.baseUrl;
  // Lo carga validateToken (vía authGuard); vacío antes de pasar por el guard.
  private _user!: User;

  // Copia: los componentes no pueden modificar el usuario del servicio.
  get user() {
    return { ...this._user };
  }

  constructor(private http: HttpClient) {}

  // JWT guardado, o '' si no hay sesión. store-back lo espera en el header x-token.
  getToken(): string {
    return localStorage.getItem(AuthService.TOKEN_KEY) || '';
  }

  private setToken(token: string) {
    localStorage.setItem(AuthService.TOKEN_KEY, token);
  }

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
        // Con ok: true el backend siempre manda el token.
        if (ok) {
          this.setToken(token!);
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
          this.setToken(token!);
        }
      }),
      map(() => true as const),
      catchError((err) => of(this.errorMessage(err)))
    );
  }

  // Renueva el JWT contra /auth/renew y carga el usuario (nombre y email los
  // usa el checkout). Devuelve false si no hay token o expiró: el backend
  // responde 401 y catchError lo convierte en false (lo usa authGuard).
  validateToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set('x-token', this.getToken());
    return this.http.get<AuthResponse>(url, {headers}).pipe(
      map((resp)=> {
        // Token nuevo con el vencimiento extendido.
        this.setToken(resp.token!);
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

  // Cierra la sesión del lado del cliente (el JWT no se invalida en el backend).
  // Limpia todo el localStorage: hoy el token es lo único que guarda la app.
  logout() {
    localStorage.clear();
  }
}
