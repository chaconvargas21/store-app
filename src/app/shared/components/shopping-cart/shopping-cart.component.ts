import { Component, OnInit } from '@angular/core';
import { ItemCart } from '../../interfaces/item.interface';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, concat, finalize, last } from 'rxjs';
import { StoreService } from '../../../store/services/store.service';
import { shoeImage } from '../../constants/shoe-images';
import { summarizeCart } from '../../utils/cart-summary';

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
      // No se usa resp.totalPrice: ver summarizeCart.
      const summary = summarizeCart(resp.items);
      this.totalQuantity = summary.totalQuantity;
      this.totalPrice = summary.totalPrice;
    });
  }

  // POST /api/cart/:id suma una unidad del producto.
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

  // Navega y cierra el drawer (el dialog no se cierra solo al cambiar de ruta).
  goToShop() {
    this._router.navigate(['/store/collections/shop']);
    this.dialogRef.close();
  }

  checkout() {
    this._router.navigate(['/store/pages/checkout']);
    this.dialogRef.close();
  }

  // Ejecuta un cambio del carrito bloqueando los botones y, al terminar,
  // recarga el carrito del backend (fuente de verdad de cantidades y precios).
  private update(request: Observable<unknown>) {
    this.busy = true;
    request
      .pipe(finalize(() => (this.busy = false)))
      .subscribe(() => this.getItemsShoppingCart());
  }
}
