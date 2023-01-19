import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import { StoreModule } from '../store/store.module';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SidebarCheckoutComponent } from './components/sidebar-checkout/sidebar-checkout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { StoreRoutingModule } from '../store/store-routing.module';


@NgModule({
  declarations: [
    CardListComponent,
    CardItemComponent,
    ShoppingCartComponent,
    SidebarCheckoutComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    ErrorPageComponent
  ],
  imports: [
    MatDialogModule,
    CommonModule,
    StoreRoutingModule
  ],
  exports: [
    MatDialogModule,
    MatStepperModule,
    ErrorPageComponent,
    CardListComponent,
    CardItemComponent,
    ShoppingCartComponent,
    SidebarCheckoutComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
