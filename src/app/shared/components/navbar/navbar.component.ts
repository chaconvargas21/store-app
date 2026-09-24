import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { SHOE_CATEGORIES, SHOE_COLLECTIONS } from '../../constants/categories';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  categories = SHOE_CATEGORIES;
  collections = SHOE_COLLECTIONS;
  showSearch = false;

  // Enfoca el input apenas el *ngIf lo agrega al DOM.
  @ViewChild('searchInput') set searchInput(el: ElementRef<HTMLInputElement> | undefined) {
    el?.nativeElement.focus();
  }

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  openDialog(){
    this.dialog.open(ShoppingCartComponent, 
      {
        minHeight: 600,
        minWidth: 900,
      }
    )
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  search(query: string) {
    const q = query.trim();
    this.router.navigate(['/store/collections/shop'], {
      queryParams: q ? { q } : {},
    });
    this.showSearch = false;
  }
}
