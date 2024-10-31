import { Routes } from '@angular/router';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'my-orders', component: OrdersListComponent },
  { path: 'my-cart' },
];
