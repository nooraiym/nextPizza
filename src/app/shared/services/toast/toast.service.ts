import { Injectable } from '@angular/core';
import { ToastType } from './toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastsService {
  toasts: { id: number; message: string; type: ToastType }[] = [];
  private nextId = 0;

  remove(id: number): void {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
  }

  show(
    message: string,
    type: ToastType = ToastType.Info,
    duration: number = 1800
  ): void {
    const id = this.nextId++;
    this.toasts = [{ id, message, type }, ...this.toasts];
    setTimeout(() => this.remove(id), duration);
  }
}
