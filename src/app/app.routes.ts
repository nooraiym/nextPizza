import { Routes } from '@angular/router';
import {
  ingredientsResolver,
  productResolver,
  recomendationsResolver,
} from './app.resolvers';
import { HomeComponent } from './pages/home/home.component';
import { routes as profileRoutes } from './pages/profile/profile.routes';
import { authGuard } from './shared/services/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Главная',
    component: HomeComponent,
  },
  {
    path: 'profile',
    title: 'Профиль',
    loadChildren: () =>
      import('./pages/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
    canActivate: [authGuard],
  },
  {
    path: 'products/:productId',
    loadComponent: () =>
      import('./pages/product/product.component').then(
        (m) => m.ProductComponent
      ),
    resolve: {
      product: productResolver,
      ingredients: ingredientsResolver,
      recomendations: recomendationsResolver,
    },
  },
  {
    path: 'access-denied',
    title: 'Доступ запрещен',
    loadComponent: () =>
      import('./pages/access-denied/access-denied.component').then(
        (m) => m.AccessDeniedComponent
      ),
  },
  {
    path: '**',
    title: 'Страница не найдена',
    loadComponent: () =>
      import('./pages/page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent
      ),
  },
];
