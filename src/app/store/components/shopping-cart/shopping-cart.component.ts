import { Component, OnInit } from '@angular/core';
import { Item, ItemCart } from '../../interfaces/item.interface';
import { StoreService } from '../../services/store.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  items: ItemCart[] = [];
  totalPrice = 0;
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
      this.totalPrice = resp.totalPrice;
    });
  }

  checkout(){
    this._router.navigate(['/store/checkout'])
    this.dialogRef.close();
  }
}
