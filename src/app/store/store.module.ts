import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { ContentComponent } from './pages/content/content.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { SharedModule } from '../shared/shared.module';
import { ItemComponent } from './pages/item/item.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarCheckoutComponent } from './components/sidebar-checkout/sidebar-checkout.component';


@NgModule({
  declarations: [
    NavbarComponent,
    CardListComponent,
    CardItemComponent,
    FooterComponent,
    HomeComponent,
    CollectionComponent,
    ContentComponent,
    SidebarComponent,
    ShoppingCartComponent,
    ItemComponent,
    CheckoutComponent,
    SidebarCheckoutComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class StoreModule { }
