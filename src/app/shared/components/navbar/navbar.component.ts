import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CART_DRAWER_CONFIG, ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { SHOE_CATEGORIES, SHOE_COLLECTIONS } from '../../constants/categories';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  categories = SHOE_CATEGORIES;
  collections = SHOE_COLLECTIONS;
  showSearch = false;
  megaOpen = false;
  accountOpen = false;
  mobileOpen = false;

  // Enfoca el input apenas el *ngIf lo agrega al DOM.
  @ViewChild('searchInput') set searchInput(el: ElementRef<HTMLInputElement> | undefined) {
    el?.nativeElement.focus();
  }

  // Sesión "activa" = hay token guardado; AuthGuard lo valida recién al pagar.
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) { }

  openDialog(){
    this.closeAll();
    this.dialog.open(ShoppingCartComponent, CART_DRAWER_CONFIG);
  }

  openMega() {
    this.accountOpen = false;
    this.megaOpen = true;
  }

  closeMega() {
    this.megaOpen = false;
  }

  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
  }

  closeAll() {
    this.megaOpen = false;
    this.accountOpen = false;
    this.mobileOpen = false;
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
    this.closeAll();
  }

  logout() {
    this.authService.logout();
    this.closeAll();
    this.router.navigate(['/store']);
  }
}
