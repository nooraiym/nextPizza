import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { HeaderStateService } from '../../components/header/header.service';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const headerStateService = inject(HeaderStateService);
  const router = inject(Router);

  return authService.isAuthenticatedSubject$.pipe(
    take(1),
    map((isAuthenticated) => {

      if (isAuthenticated) {
        return true;
      }

      if (route.routeConfig?.path === 'my-cart') {
        headerStateService.openAuthModal();
        return false;
      }

      router.navigate(['/access-denied']);
      return false;
    })
  );
};
