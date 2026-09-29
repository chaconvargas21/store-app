import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { finalize, switchMap } from 'rxjs/operators';
import { Item } from '../../../shared/interfaces/item.interface';
import { StoreService } from '../../services/store.service';
import { shoeImage } from '../../../shared/constants/shoe-images';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-item',
  standalone: false,
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  item?: Item;
  adding = false;

  get image(): string {
    return shoeImage(this.item);
  }

  // `quantity` es el stock del producto (modelo Product de store-back).
  get soldOut(): boolean {
    return !!this.item && this.item.quantity <= 0;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    private notification: NotificationService
  ) {
    // switchMap cancela la request anterior si se navega a otro producto sin
    // salir del componente; takeUntilDestroyed corta la suscripción a `params`
    // (que nunca completa) al destruirlo.
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.storeService.getItemById(id)),
        takeUntilDestroyed()
      )
      .subscribe((resp) => {
        this.item = resp;
      });
  }

  // Agrega una unidad al carrito de la sesión y avisa el resultado con un snackbar.
  addItem() {
    if (!this.item || this.soldOut) return;
    this.adding = true;
    this.storeService
      .addItem(this.item._id)
      .pipe(finalize(() => (this.adding = false)))
      .subscribe((added) => {
        if (added) {
          this.notification.success('Agregado al carrito', 3000);
        } else {
          this.notification.danger('No se pudo agregar al carrito', 3000);
        }
      });
  }
}
