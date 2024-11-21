import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticatedSubject$.pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/access-denied']);
      }
    })
  );
};
