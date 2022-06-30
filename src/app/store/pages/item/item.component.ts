import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Item } from '../../interfaces/item.interface';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  item!: Item;
  constructor(
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService
  ) {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.storeService.getItemById(id)))
      .subscribe((resp) => {
        this.item = resp;
      });
  }

  ngOnInit(): void {}

  addItem() {
    this.storeService
      .addItem(this.item._id)
      .subscribe((resp) => console.log(resp));
  }
}
