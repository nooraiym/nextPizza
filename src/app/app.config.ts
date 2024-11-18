import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  ErrorHandler,
  provideZoneChangeDetection,
} from '@angular/core';
import { TitleStrategy, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { authInterceptor } from './shared/services/auth/auth.interceptor';
import { CustomTitleStrategy } from './shared/services/custom-title-strategy.service';
import { ErrorHandlerService } from './shared/services/error-handler/error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: TitleStrategy, useClass: CustomTitleStrategy },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
