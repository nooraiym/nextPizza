import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ToastType } from './toast/toast.model';
import { ToastsService } from './toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService {
  constructor(private toastsService: ToastsService) {}

  protected handleToast(message: string): Observable<never> {
    this.toastsService.show(message, ToastType.Error);
    return throwError(() => new Error(message));
  }
}
