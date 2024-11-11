import { Routes } from '@angular/router';
import { ProductComponent } from './components/product-content/product.component';

export const routes: Routes = [
  { path: ':productId', component: ProductComponent },
];
