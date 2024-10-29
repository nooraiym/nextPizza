import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/components/home/home.component';
import { HomeLayoutComponent } from './pages/home/layout/layout.component';
import { PageNotFoundComponent } from './pages/page-not-found/components/page-not-found.component';
import { NotFoundLayoutComponent } from './pages/page-not-found/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [{ path: '', component: HomeComponent }],
  },
  {
    path: '**',
    component: NotFoundLayoutComponent,
    children: [{ path: '**', component: PageNotFoundComponent }],
  },
];

// 404

// home
// home/product
// home/product/<product-name>

// home/ - оформление заказа

// registration
// authentification or authorization
// access denied

// profile
// profile/orders
// profile/cart
