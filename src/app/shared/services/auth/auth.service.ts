import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, EMPTY, Observable, catchError, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseService } from '../base.service';
import { ToastsService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private mockAPI = environment.apiUrl;
  private accessToken: string | null = null;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(true);
  isAuthenticatedSubject$: Observable<boolean> =
    this.isAuthenticatedSubject.asObservable();

  constructor(toastsService: ToastsService) {
    super(toastsService);
  }

  getAccessToken() {
    return this.accessToken;
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http
      .post(
        `${this.mockAPI}/register`,
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      )
      .pipe(
        catchError(() =>
          this.handleToast('Регистрация не прошла. Повторите попытку позже.')
        )
      );
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(
        `${this.mockAPI}/login`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        tap((response: any) => {
          this.accessToken = response.accessToken;
          this.isAuthenticatedSubject.next(true);
        }),
        catchError(() => {
          this.isAuthenticatedSubject.next(false);
          this.handleToast('Сессия истекла, войдите снова');
          return EMPTY;
        })
      );
  }

  getProfile(): Observable<any> {
    if (!this.accessToken) {
      this.handleToast('Access token is missing');
    }

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.accessToken}`
    );
    return this.http.get(`${this.mockAPI}/profile`, { headers });
  }

  logout() {
    this.router.navigate(['']);
    this.http
      .post(`${this.mockAPI}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.accessToken = null;
          this.isAuthenticatedSubject.next(false);
        })
      );
  }
}
