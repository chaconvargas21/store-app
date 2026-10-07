import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.removeItem('token');
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
    localStorage.removeItem('token');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('validateToken guarda el email que devuelve /auth/renew (lo usa el checkout)', () => {
    const http = TestBed.inject(HttpTestingController);
    localStorage.setItem('token', 'viejo');
    let valid: boolean | undefined;
    service.validateToken().subscribe((ok) => (valid = ok));

    const req = http.expectOne(`${environment.baseUrl}/auth/renew`);
    expect(req.request.headers.get('x-token')).toBe('viejo');
    req.flush({ ok: true, uid: 'u1', name: 'Ana', email: 'ana@test.com', token: 'nuevo' });

    expect(valid).toBeTrue();
    expect(service.user.email).toBe('ana@test.com');
    expect(localStorage.getItem('token')).toBe('nuevo');
    localStorage.removeItem('token');
    http.verify();
  });

  it('logout elimina el JWT y una renovación sin token no autoriza al usuario', () => {
    localStorage.setItem('token', 'token-anterior');
    service.logout();
    expect(service.getToken()).toBe('');
    let valid: boolean | undefined;
    service.validateToken().subscribe(value => valid = value);
    const req = TestBed.inject(HttpTestingController).expectOne(`${environment.baseUrl}/auth/renew`);
    expect(req.request.headers.get('x-token')).toBe('');
    req.flush({ msg: 'Token not found' }, { status: 401, statusText: 'Unauthorized' });
    expect(valid).toBeFalse();
    expect(service.getToken()).toBe('');
  });

  it('token expirado produce false y no sustituye el token por uno válido', () => {
    localStorage.setItem('token', 'token-expirado');
    let valid: boolean | undefined;
    service.validateToken().subscribe(value => valid = value);
    const req = TestBed.inject(HttpTestingController).expectOne(`${environment.baseUrl}/auth/renew`);
    expect(req.request.headers.get('x-token')).toBe('token-expirado');
    req.flush({ msg: 'Token expired' }, { status: 401, statusText: 'Unauthorized' });
    expect(valid).toBeFalse();
    expect(service.getToken()).toBe('token-expirado');
  });
});
