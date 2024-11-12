import { Routes } from '@angular/router';
import { ProductComponent } from './components/product-content/product.component';
import {
  ingredientsResolver,
  productResolver,
  recomendationsResolver,
} from './resolvers';

export const routes: Routes = [
  {
    path: ':productId',
    component: ProductComponent,
    resolve: {
      product: productResolver,
      ingredients: ingredientsResolver,
      recomendations: recomendationsResolver,
    },
  },
];
