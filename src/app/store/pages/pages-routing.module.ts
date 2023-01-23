import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { ItemComponent } from './item/item.component';
import { CollectionComponent } from './collection/collection.component';

const routes: Routes = [
  {
    path: 'collection',
    component: CollectionComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: ':id',
    component: ItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
