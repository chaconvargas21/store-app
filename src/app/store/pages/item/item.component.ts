import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, switchMap } from 'rxjs/operators';
import { Item } from '../../interfaces/item.interface';
import { StoreService } from '../../services/store.service';
import { shoeImage } from '../../../shared/constants/shoe-images';

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
    private snackBar: MatSnackBar
  ) {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.storeService.getItemById(id)))
      .subscribe((resp) => {
        this.item = resp;
      });
  }

  addItem() {
    if (!this.item || this.soldOut) return;
    this.adding = true;
    this.storeService
      .addItem(this.item._id)
      .pipe(finalize(() => (this.adding = false)))
      .subscribe((added) => {
        this.snackBar.open(
          added ? 'Agregado al carrito' : 'No se pudo agregar al carrito',
          'Cerrar',
          {
            duration: 3000,
            panelClass: added ? 'snackbar-success' : 'snackbar-danger',
          }
        );
      });
  }
}
