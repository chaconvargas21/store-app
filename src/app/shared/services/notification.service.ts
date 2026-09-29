import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// Snackbars de feedback con la misma forma en toda la app. Los colores son las
// clases globales `snackbar-success`/`snackbar-danger` (src/sass/styles.scss).
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string, duration = 5000) {
    this.open(message, 'snackbar-success', duration);
  }

  danger(message: string, duration = 5000) {
    this.open(message, 'snackbar-danger', duration);
  }

  private open(message: string, panelClass: string, duration: number) {
    this.snackBar.open(message, 'Cerrar', { duration, panelClass });
  }
}
