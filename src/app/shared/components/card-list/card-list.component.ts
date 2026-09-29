import { Component, Input } from '@angular/core';
import { Item } from '../../interfaces/item.interface';

// Grilla de productos: solo presenta; el filtrado lo hace quien la usa (ej. ShopComponent).
@Component({
  selector: 'app-card-list',
  standalone: false,
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent {
  @Input() items: Item[] = [];
}
