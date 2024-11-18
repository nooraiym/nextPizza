import { ErrorHandler, Injectable, inject } from '@angular/core';
import { ToastType } from '../toast/toast.model';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  private toastService = inject(ToastService);

  handleError(error: any): void {
    console.error('Error occurred:', error);
    const message = error?.message || 'An unexpected error occurred!';
    this.toastService.show(message, ToastType.Error);
  }
}
