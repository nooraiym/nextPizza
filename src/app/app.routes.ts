import { Routes } from '@angular/router';
import {
  ingredientsResolver,
  productResolver,
  recomendationsResolver,
} from './app.resolvers';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProductComponent } from './pages/product/product.component';
import { ProfileLayoutComponent } from './pages/profile/layout/layout.component';
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
    title: 'Доступ запрещен',
    component: AccessDeniedComponent,
  },
  {
    path: '**',
    title: 'Страница не найдена',
    component: PageNotFoundComponent,
  },
];
