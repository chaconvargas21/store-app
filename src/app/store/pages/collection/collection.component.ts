import { Component } from '@angular/core';

@Component({
  selector: 'app-collection',
  standalone: false,
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent {
  // `slug` coincide con SHOE_COLLECTIONS (shared/constants/categories.ts).
  collections = [
    {
      slug: 'running',
      label: 'Running',
      image: './assets/images/card-1.jpg',
      description: 'Zapatillas livianas y con buena amortiguación para entrenar, correr o caminar todo el día.',
    },
    {
      slug: 'casual',
      label: 'Casual',
      image: './assets/images/card-2.jpg',
      description: 'Calzado cómodo para el día a día: combina con todo, de la oficina al fin de semana.',
    },
    {
      slug: 'edicion-limitada',
      label: 'Edición limitada',
      image: './assets/images/card-3.jpg',
      description: 'Modelos especiales en tiradas cortas. Cuando se agotan, no vuelven.',
    },
  ];
}
