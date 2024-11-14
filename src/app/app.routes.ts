import { Routes } from '@angular/router';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { routes as homeRoutes } from './pages/home/home.routes';
import { HomeLayoutComponent } from './pages/home/layout/layout.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProductComponent } from './pages/product/product.component';
import { ProfileLayoutComponent } from './pages/profile/layout/layout.component';
import { routes as profileRoutes } from './pages/profile/profile.routes';
import {
  ingredientsResolver,
  productResolver,
  recomendationsResolver,
} from './app.resolvers';
import { authGuard } from './shared/services/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: homeRoutes,
  },
  {
    path: 'profile',
    component: ProfileLayoutComponent,
    children: profileRoutes,
    canActivate: [authGuard],
  },
  {
    path: 'products/:productId',
    component: ProductComponent,
    resolve: {
      product: productResolver,
      ingredients: ingredientsResolver,
      recomendations: recomendationsResolver,
    },
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
