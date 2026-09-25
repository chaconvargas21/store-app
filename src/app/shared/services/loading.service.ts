import { computed, Injectable, signal } from '@angular/core';

// Cuenta las requests HTTP en curso (ver LoadingInterceptor); el loader se
// muestra mientras haya al menos una.
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private pending = signal(0);
  readonly loading = computed(() => this.pending() > 0);

  start() {
    this.pending.update((n) => n + 1);
  }

  stop() {
    this.pending.update((n) => Math.max(0, n - 1));
  }
}
