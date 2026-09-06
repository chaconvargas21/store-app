import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../interfaces/item.interface';

const SHOE_IMAGES = [
  './assets/images/calzado-1.jpg',
  './assets/images/calzado-2.jpg',
  './assets/images/calzado-3.jpg',
  './assets/images/calzado-4.jpg',
  './assets/images/calzado-5.jpg',
];

@Component({
  selector: 'app-card-item',
  standalone: false,
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {
  @Input() item: Item | undefined;
  @Input() index: number = 0;

  imageUrl: string = SHOE_IMAGES[0];

  constructor() { }

  ngOnInit(): void {
    this.imageUrl = SHOE_IMAGES[this.index % SHOE_IMAGES.length];
  }

}
