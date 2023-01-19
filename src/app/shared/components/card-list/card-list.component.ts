import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../interfaces/item.interface';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  @Input() items: Item[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
