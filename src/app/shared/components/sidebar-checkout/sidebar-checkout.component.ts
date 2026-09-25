import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemCart } from '../../interfaces/item.interface';
import { StoreService } from '../../../store/services/store.service';
import { shoeImage } from '../../constants/shoe-images';
import {
  CART_DRAWER_CONFIG,
  ShoppingCartComponent,
} from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-sidebar-checkout',
  standalone: false,
  templateUrl: './sidebar-checkout.component.html',
  styleUrls: ['./sidebar-checkout.component.scss'],
})
export class SidebarCheckoutComponent implements OnInit {
  // false una vez pagada la orden: el carrito ya no se puede editar.
  @Input() editable = true;

  items: ItemCart[] = [];
  totalPrice = 0;
  totalQuantity = 0;
  shoeImage = shoeImage;

  constructor(private storeService: StoreService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getItemsShoppingCart();
  }

  getItemsShoppingCart() {
    this.storeService.getItemsCartShopping().subscribe((resp) => {
      this.items = resp.items;
      this.totalQuantity = resp.items.reduce((sum, i) => sum + i.quantity, 0);
      // Igual que ShoppingCartComponent: el totalPrice de store-back se infla
      // con cantidad > 1, así que se suma el precio de cada línea.
      this.totalPrice = resp.items.reduce((sum, i) => sum + i.price, 0);
    });
  }

  editCart() {
    this.dialog
      .open(ShoppingCartComponent, CART_DRAWER_CONFIG)
      .afterClosed()
      .subscribe(() => this.getItemsShoppingCart());
  }
}
