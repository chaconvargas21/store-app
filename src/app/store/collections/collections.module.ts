import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionsRoutingModule } from './collections-routing.module';
import { ShopComponent } from './shop/shop.component';
import { StoreModule } from '../store.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ShopComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CollectionsRoutingModule,
  ]
})
export class CollectionsModule { }
