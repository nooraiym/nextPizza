import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ToastType } from './toast/toast.model';
import { ToastService } from './toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService {
  constructor(private toastService: ToastService) {}

  protected handleToast(message: string): Observable<never> {
    this.toastService.show(message, ToastType.Error);
    return throwError(() => new Error(message));
  }
}
