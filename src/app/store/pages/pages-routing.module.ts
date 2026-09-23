import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { ItemComponent } from './item/item.component';
import { CollectionComponent } from './collection/collection.component';
import { AuthGuard } from '../../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'collection',
    component: CollectionComponent
  },
  {
    // El backend exige JWT para iniciar y confirmar el pago; el catalogo y
    // el carrito siguen siendo anonimos.
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard]
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
