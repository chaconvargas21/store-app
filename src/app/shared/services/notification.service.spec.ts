import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    snackBar = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);
    TestBed.configureTestingModule({ providers: [{ provide: MatSnackBar, useValue: snackBar }] });
    service = TestBed.inject(NotificationService);
  });

  it('success usa la clase verde y 5 s por defecto', () => {
    service.success('Listo');
    expect(snackBar.open).toHaveBeenCalledWith('Listo', 'Cerrar', { duration: 5000, panelClass: 'snackbar-success' });
  });

  it('danger usa la clase roja y respeta la duración', () => {
    service.danger('Error', 3000);
    expect(snackBar.open).toHaveBeenCalledWith('Error', 'Cerrar', { duration: 3000, panelClass: 'snackbar-danger' });
  });
});
