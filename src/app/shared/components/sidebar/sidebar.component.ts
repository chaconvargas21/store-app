import { Component } from '@angular/core';
import { SHOE_CATEGORIES, SHOE_COLLECTIONS } from '../../constants/categories';

// Menú mobile: mismas categorías y colecciones que el mega menú del navbar.
@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  categories = SHOE_CATEGORIES;
  collections = SHOE_COLLECTIONS;
}
