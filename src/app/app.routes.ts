import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/components/home/home.component';
import { HomeLayoutComponent } from './pages/home/layout/layout.component';
import { PageNotFoundComponent } from './pages/page-not-found/components/page-not-found.component';
import { NotFoundLayoutComponent } from './pages/page-not-found/layout/layout.component';
import { OrdersComponent } from './pages/profile/components/orders/orders.component';
import { ProfileComponent } from './pages/profile/components/profile/profile.component';
import { ProfileLayoutComponent } from './pages/profile/profile-layout/profile-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [{ path: '', component: HomeComponent }],
  },
  {
    path: 'profile',
    component: ProfileLayoutComponent,
    children: [
      { path: '', component: ProfileComponent },
      { path: 'my-orders', component: OrdersComponent },
    ],
  },
  {
    path: '**',
    component: NotFoundLayoutComponent,
    children: [{ path: '**', component: PageNotFoundComponent }],
  },
];

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
