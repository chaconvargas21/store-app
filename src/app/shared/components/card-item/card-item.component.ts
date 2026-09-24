import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../interfaces/item.interface';
import { SHOE_IMAGES, shoeImage } from '../../constants/shoe-images';

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
    this.imageUrl = shoeImage(this.index);
  }

}
