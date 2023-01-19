import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Item } from '../../interfaces/item.interface';
import { StoreService } from '../../services/store.service';
@Component({
  selector: 'app-shop',
  animations: [
    trigger('openClose', [
      // ...
      state(
        'open',
        style({
          width: '200px',
          opacity: '1',
        })
      ),
      state(
        'closed',
        style({
          width: '0',
          opacity: '0',
          overflow: 'hidden',
        })
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.5s ease-in')]),
    ]),
  ],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  isOpen = false;
  items: Item[] = [];
  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.storeService.getItems().subscribe( resp => this.items = resp)
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }


}
