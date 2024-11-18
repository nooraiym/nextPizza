import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';
import { ToastType } from '../../services/toast/toast.model';
import { ToastsService } from '../../services/toast/toast.service';

@Component({
  selector: 'toast',
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  readonly X = X;
  ToastType = ToastType;
  public toastsService = inject(ToastsService);

  handleCloseToast(id: number) {
    this.toastsService.remove(id);
  }
}
