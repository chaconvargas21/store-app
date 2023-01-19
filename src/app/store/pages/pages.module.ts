import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CollectionComponent } from './collection/collection.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ItemComponent } from './item/item.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CollectionComponent,
    CheckoutComponent,
    ItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
