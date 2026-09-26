import { Component, Input } from '@angular/core';
import { Item } from '../../interfaces/item.interface';
import { shoeImage } from '../../constants/shoe-images';

@Component({
  selector: 'app-card-item',
  standalone: false,
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent {
  @Input() item: Item | undefined;

  get imageUrl(): string {
    return shoeImage(this.item);
  }
}
