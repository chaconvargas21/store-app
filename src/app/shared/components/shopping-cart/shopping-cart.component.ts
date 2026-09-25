import { Component, OnInit } from '@angular/core';
import { ItemCart } from '../../interfaces/item.interface';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, concat, finalize, last } from 'rxjs';
import { StoreService } from '../../../store/services/store.service';
import { shoeImage } from '../../constants/shoe-images';

// Drawer lateral derecho; los estilos del panel están en `.cart-drawer` (styles.scss).
export const CART_DRAWER_CONFIG: MatDialogConfig = {
  position: { right: '0', top: '0' },
  height: '100vh',
  width: '420px',
  maxWidth: '100vw',
  panelClass: 'cart-drawer',
};

@Component({
  selector: 'app-shopping-cart',
  standalone: false,
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  items: ItemCart[] = [];
  totalPrice = 0;
  totalQuantity = 0;
  // Deshabilita los controles mientras hay una request al carrito en curso.
  busy = false;
  shoeImage = shoeImage;

  constructor(
    private storeService: StoreService,
    public dialogRef: MatDialogRef<ShoppingCartComponent>,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getItemsShoppingCart();
  }

  getItemsShoppingCart() {
    this.storeService.getItemsCartShopping().subscribe((resp) => {
      this.items = resp.items;
      this.totalQuantity = resp.items.reduce((sum, i) => sum + i.quantity, 0);
      // Se suma en el cliente: el totalPrice de store-back suma el precio de
      // línea (no el unitario) en cada add, así que se infla con cantidad > 1.
      this.totalPrice = resp.items.reduce((sum, i) => sum + i.price, 0);
    });
  }

  increment(itemCart: ItemCart) {
    this.update(this.storeService.addItem(itemCart.item._id));
  }

  // DELETE /api/cart/:id quita una unidad (y la línea entera si queda en 0).
  decrement(itemCart: ItemCart) {
    this.update(this.storeService.removeItemCartShopping(itemCart.item._id));
  }

  // En serie: cada request reescribe la sesión, en paralelo se pisarían.
  removeItem(itemCart: ItemCart) {
    const id = itemCart.item._id;
    const requests = Array.from({ length: itemCart.quantity }, () =>
      this.storeService.removeItemCartShopping(id)
    );
    this.update(concat(...requests).pipe(last()));
  }

  goToShop() {
    this._router.navigate(['/store/collections/shop']);
    this.dialogRef.close();
  }

  checkout() {
    this._router.navigate(['/store/pages/checkout']);
    this.dialogRef.close();
  }

  private update(request: Observable<unknown>) {
    this.busy = true;
    request
      .pipe(finalize(() => (this.busy = false)))
      .subscribe(() => this.getItemsShoppingCart());
  }
}
