import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'auth-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss',
})
export class AuthModalComponent {
  @Output() close = new EventEmitter<void>();
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.http
        .post('http://localhost:3000/auth/login', { email, password })
        .subscribe({
          next: (response) => {
            console.log('Login successful:', response);
            this.close.emit(); // Закрыть модальное окно при успешном входе
          },
          error: (error) => {
            this.errorMessage =
              'Failed to login. Please check your credentials.';
            console.error('Login error:', error);
          },
        });
    }
  }

  closeModal() {
    this.close.emit();
  }
}
