import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { ItemComponent } from './item/item.component';
import { CollectionComponent } from './collection/collection.component';
import { authGuard } from '../../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'collection',
    component: CollectionComponent
  },
  {
    // El backend exige JWT para iniciar y confirmar el pago; el catálogo y
    // el carrito siguen siendo anónimos.
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [authGuard]
  },
  {
    // Detalle de producto: va al final para que no capture 'collection' ni 'checkout'.
    path: ':id',
    component: ItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
