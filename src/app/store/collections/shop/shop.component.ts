import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Item } from '../../interfaces/item.interface';
import { StoreService } from '../../services/store.service';
import { findCategory, matchesCategory, matchesSearch } from 'src/app/shared/constants/categories';
@Component({
  selector: 'app-shop',
  standalone: false,
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
  title = 'Todo el calzado';
  constructor(private storeService: StoreService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getItems();
  }

  // Se recalcula cuando cambian los productos o los query params
  // (`categoria` desde el navbar/sidebar, `q` desde la búsqueda).
  getItems() {
    combineLatest([this.storeService.getItems(), this.route.queryParamMap])
      .subscribe(([resp, params]) => {
        // getItems() devuelve el mensaje de error (string) si falla la llamada.
        const allItems = Array.isArray(resp) ? resp : [];
        this.items = this.filterItems(allItems, params);
      });
  }

  private filterItems(items: Item[], params: ParamMap): Item[] {
    const categoria = params.get('categoria');
    const q = params.get('q')?.trim();

    this.title = q
      ? `Resultados para "${q}"`
      : findCategory(categoria)?.label ?? 'Todo el calzado';

    return items.filter(
      (item) =>
        (!categoria || matchesCategory(item, categoria)) &&
        (!q || matchesSearch(item, q))
    );
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }


}
