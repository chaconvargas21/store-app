import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, switchMap } from 'rxjs/operators';
import { Item } from '../../interfaces/item.interface';
import { StoreService } from '../../services/store.service';
import { SHOE_IMAGES } from '../../../shared/constants/shoe-images';

@Component({
  selector: 'app-item',
  standalone: false,
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  item?: Item;
  adding = false;
  // La API no guarda fotos: card-item manda la suya en el state de la navegación
  // para que el detalle muestre la misma. Si se entra por URL, la primera.
  image: string = history.state?.image ?? SHOE_IMAGES[0];

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
