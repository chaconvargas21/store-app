import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, provideRouter, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let auth: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    auth = jasmine.createSpyObj<AuthService>('AuthService', ['validateToken']);
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: AuthService, useValue: auth }],
    });
  });

  function run(): Observable<boolean | UrlTree> {
    return TestBed.runInInjectionContext(() =>
      authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    ) as Observable<boolean | UrlTree>;
  }

  it('deja pasar con un token válido', (done) => {
    auth.validateToken.and.returnValue(of(true));
    run().subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  });

  it('sin token válido redirige a /auth', (done) => {
    auth.validateToken.and.returnValue(of(false));
    run().subscribe((result) => {
      expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toBe('/auth');
      done();
    });
  });
});
