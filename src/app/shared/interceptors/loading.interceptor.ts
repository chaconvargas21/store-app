import { HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

// Para requests que ya tienen su propio feedback (ej. agregar al carrito) y
// no deberían tapar la página con el loader.
export const SKIP_LOADING = new HttpContextToken<boolean>(() => false);

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.context.get(SKIP_LOADING)) {
      return next.handle(req);
    }

    this.loadingService.start();
    return next.handle(req).pipe(finalize(() => this.loadingService.stop()));
  }
}
