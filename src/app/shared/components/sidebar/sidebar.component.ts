import { Component } from '@angular/core';
import { SHOE_CATEGORIES, SHOE_COLLECTIONS } from '../../constants/categories';

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
