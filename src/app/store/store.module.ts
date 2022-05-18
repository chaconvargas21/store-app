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


@NgModule({
  declarations: [
    NavbarComponent,
    CardListComponent,
    CardItemComponent,
    FooterComponent,
    HomeComponent,
    CollectionComponent,
    ContentComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
  ]
})
export class StoreModule { }
