import { Component, OnInit } from '@angular/core';
import { Item, ItemCart } from '../../interfaces/item.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StoreService } from '../../../store/services/store.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
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
  
  removeItemShoppingCart(id: string){
    this.storeService.removeItemCartShopping(id).subscribe((resp) => {
      this.getItemsShoppingCart();
    });
  }

  checkout(){
    this._router.navigate(['/store/pages/checkout'])
    this.dialogRef.close();
  }
}
