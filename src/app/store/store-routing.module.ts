import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: StoreComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
      },
      {
        path: 'pages',
        loadChildren: () =>import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'collections',
        loadChildren: () =>import('./collections/collections.module').then((m) => m.CollectionsModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
