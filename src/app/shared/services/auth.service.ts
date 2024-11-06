import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  private apiUrl = 'http://localhost:3000/api/v1';
  private tokenKey = 'authToken';

  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor() {
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

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/auth`, { email, password })
      .pipe(
        tap((response) => {
          this.setToken(response.token);
        })
      );
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http
      .post<{ message: string; token: string }>(`${this.apiUrl}/users`, {
        name,
        email,
        password,
      })
      .pipe(tap((response) => this.setToken(response.token)));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['']);
    this.isLoggedInSubject.next(false);
  }
}
