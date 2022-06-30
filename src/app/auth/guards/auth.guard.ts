import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.authService.validateToken().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    return this.authService.validateToken().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }
}
