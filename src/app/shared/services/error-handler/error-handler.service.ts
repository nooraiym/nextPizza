import { ErrorHandler, Injectable, inject } from '@angular/core';
import { ToastType } from '../toast/toast.model';
import { ToastsService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  private toastsService = inject(ToastsService);

  handleError(error: any): void {
    console.error('Error occurred:', error);
    const message = error?.message || 'An unexpected error occurred!';
    this.toastsService.show(message, ToastType.Error);
  }
}
