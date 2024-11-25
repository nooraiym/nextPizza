import { Routes } from '@angular/router';
import { authGuard } from '../../shared/services/auth/auth.guard';
import { CartComponent } from './components/cart/cart.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { ProfileComponent } from './components/profile-content/profile.component';

export const routes: Routes = [
  { path: '', component: ProfileComponent, canActivate: [authGuard] },
  {
    path: 'my-orders',
    component: OrdersListComponent,
    canActivate: [authGuard],
    data: { path: 'my-orders' },
  },
  {
    path: 'my-cart',
    component: CartComponent,
    canActivate: [authGuard],
    data: {
      path: 'my-cart',
    },
  },
];
