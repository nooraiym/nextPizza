import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../base.service';
import { ToastsService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private tokenKey = environment.tokenKey;
  private mockAPI = environment.apiUrl;
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(toastsService: ToastsService) {
    super(toastsService);
    this.isLoggedInSubject.next(this.hasToken());
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.isLoggedInSubject.next(true);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http
      .post<{ message: string; token: string }>(`${this.mockAPI}/register`, {
        name,
        email,
        password,
      })
      .pipe(
        tap((response) => this.setToken(response.token)),
        catchError(() =>
          this.handleToast('Регистрация не прошла. Повторите попытку позже.')
        )
      );
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<{ token: string }>(`${this.mockAPI}/auth`, { email, password })
      .pipe(
        tap((response) => {
          this.setToken(response.token);
        }),
        catchError(() =>
          this.handleToast('Не удалось войти. Проверьте введенные данные')
        )
      );
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['']);
  }
}
