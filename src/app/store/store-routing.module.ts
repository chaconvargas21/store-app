import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContentComponent } from './pages/content/content.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { ItemComponent } from './pages/item/item.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'content',
        component: ContentComponent
      },
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
      },
      {
        path: '**',
        redirectTo: 'content' 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
