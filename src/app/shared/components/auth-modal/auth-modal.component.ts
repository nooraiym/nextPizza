import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'auth-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss',
})
export class AuthModalComponent {
  @Output() close = new EventEmitter<void>();

  private authService = inject(AuthService);
  private router = inject(Router);
  loginForm: FormGroup;

  errorMessage: string | null = null;
  isLoginMode = true;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleAuthMode() {
    this.isLoginMode = !this.isLoginMode;
    this.loginForm.reset();
  }

  onSubmit() {
    const { name, email, password } = this.loginForm.value;
    if (this.loginForm.valid) {
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.close.emit();
          this.router.navigate(['']);
        },
        error: (error) => {
          this.errorMessage = 'Не удалось войти. Проверьте введенные данные';
          console.error('Login error:', error);
        },
      });
    } else {
      this.authService.register(name, email, password).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.toggleAuthMode();
        },
        error: (error) => {
          this.errorMessage = 'Регистрация не прошла. Повторите попытку позже.';
          console.error('Registration error:', error);
        }
      });
    }
  }

  closeModal() {
    this.close.emit();
  }
}
