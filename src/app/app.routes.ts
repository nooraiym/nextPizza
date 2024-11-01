import { Routes } from '@angular/router';
import { routes as homeRoutes } from './pages/home/home.routes';
import { routes as productsRoute } from './pages/products/products.routes';
import { routes as profileRoutes } from './pages/profile/profile.routes';

import { HomeLayoutComponent } from './pages/home/layout/layout.component';
import { PageNotFoundComponent } from './pages/page-not-found/components/page-not-found/page-not-found.component';
import { NotFoundLayoutComponent } from './pages/page-not-found/layout/layout.component';
import { ProductsLayoutComponent } from './pages/products/layout/layout.component';
import { ProfileLayoutComponent } from './pages/profile/layout/layout.component';

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
  },
  {
    path: 'products',
    component: ProductsLayoutComponent,
    children: productsRoute,
  },
  {
    path: '**',
    component: NotFoundLayoutComponent,
    children: [{ path: '**', component: PageNotFoundComponent }],
  },
];

// registration
// authentification or authorization
// access denied
