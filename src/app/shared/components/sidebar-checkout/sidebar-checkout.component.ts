import { Component, OnInit } from '@angular/core';
import { ItemCart } from '../../interfaces/item.interface';
import { StoreService } from '../../../store/services/store.service';

@Component({
  selector: 'app-sidebar-checkout',
  templateUrl: './sidebar-checkout.component.html',
  styleUrls: ['./sidebar-checkout.component.scss'],
})
export class SidebarCheckoutComponent implements OnInit {
  items: ItemCart[] = [];
  totalPrice = 0;
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.getItemsShoppingCart();
  }

  getItemsShoppingCart() {
    this.storeService.getItemsCartShopping().subscribe((resp) => {
      this.items = resp.items;
      this.totalPrice = resp.totalPrice;
    });
  }
}
