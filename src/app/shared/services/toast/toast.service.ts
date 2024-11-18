import { Injectable } from '@angular/core';
import { ToastType } from './toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: { message: string; type: ToastType }[] = [];

  private remove(message: string): void {
    this.toasts = this.toasts.filter((toast) => toast.message !== message);
  }

  show(
    message: string,
    type: ToastType = ToastType.Info,
    duration: number = 30000
  ) {
    this.toasts.push({ message, type });
    setTimeout(() => this.remove(message), duration);
  }

  removeToast(): void {
    if (this.toasts.length > 0) {
      this.toasts.shift();
    }
  }
}
