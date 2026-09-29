import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

// Deja pasar solo con un JWT válido: validateToken lo renueva contra
// /auth/renew y carga el usuario en AuthService (el checkout lo usa para
// precargar el formulario). Sin sesión válida, redirige al login.
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  return inject(AuthService)
    .validateToken()
    .pipe(map((valid) => valid || router.parseUrl('/auth')));
};
