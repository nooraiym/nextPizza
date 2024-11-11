import { Routes } from '@angular/router';
import { AccessDeniedComponent } from './pages/access-denied/components/access-denied-content/access-denied.component';
import { AccessDeniedLayoutComponent } from './pages/access-denied/layout/layout.component';
import { routes as homeRoutes } from './pages/home/home.routes';
import { HomeLayoutComponent } from './pages/home/layout/layout.component';
import { PageNotFoundComponent } from './pages/page-not-found/components/page-not-found-content/page-not-found.component';
import { NotFoundLayoutComponent } from './pages/page-not-found/layout/layout.component';
import { ProductsLayoutComponent } from './pages/products/layout/layout.component';
import { routes as productsRoute } from './pages/products/products.routes';
import { ProfileLayoutComponent } from './pages/profile/layout/layout.component';
import { routes as profileRoutes } from './pages/profile/profile.routes';
import { authGuard } from './shared/services/auth.guard';

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
    path: 'products',
    component: ProductsLayoutComponent,
    children: productsRoute,
  },
  {
    path: 'access-denied',
    component: AccessDeniedLayoutComponent,
    children: [{ path: '', component: AccessDeniedComponent }],
  },
  {
    path: '**',
    component: NotFoundLayoutComponent,
    children: [{ path: '**', component: PageNotFoundComponent }],
  },
];
