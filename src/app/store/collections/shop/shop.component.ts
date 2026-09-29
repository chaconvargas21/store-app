import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Item } from 'src/app/shared/interfaces/item.interface';
import { StoreService } from '../../services/store.service';
import { findCategory, matchesCategory, matchesSearch } from 'src/app/shared/constants/categories';

@Component({
  selector: 'app-shop',
  standalone: false,
  // Panel de filtros colapsable: `open` lo muestra con 200px de ancho,
  // `closed` lo reduce a 0 y oculta el contenido que desborda.
  animations: [
    trigger('openClose', [
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
  private destroyRef = inject(DestroyRef);

  constructor(private storeService: StoreService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getItems();
  }

  // Se recalcula cuando cambian los productos o los query params
  // (`categoria` desde el navbar/sidebar, `q` desde la búsqueda).
  getItems() {
    // queryParamMap nunca completa: sin takeUntilDestroyed la suscripción
    // seguiría viva después de salir de la página.
    combineLatest([this.storeService.getItems(), this.route.queryParamMap])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([items, params]) => {
        this.items = this.filterItems(items, params);
      });
  }

  // Aplica la categoría y la búsqueda de la URL, y actualiza el título de la página.
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

  // Abre o cierra el panel de filtros (dispara la animación `openClose`).
  toggle() {
    this.isOpen = !this.isOpen;
  }
}
