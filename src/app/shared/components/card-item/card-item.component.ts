import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../interfaces/item.interface';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {
  @Input() item: Item | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
