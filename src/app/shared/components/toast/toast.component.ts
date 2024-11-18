import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';
import { ToastType } from '../../services/toast/toast.model';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'toast',
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  readonly X = X;
  toastService = inject(ToastService);

  isInfo(): boolean {
    return this.toastService.toasts[0].type === ToastType.Info;
  }
  isSuccess(): boolean {
    return this.toastService.toasts[0].type === ToastType.Success;
  }
  isError(): boolean {
    return this.toastService.toasts[0].type === ToastType.Error;
  }
  handleCloseToast() {
    this.toastService.removeToast();
  }
}
