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
  signIn(email: string, password: string) {
    this.authService.login(email, password).subscribe({
      next: () => {
        this.close.emit();
        this.router.navigate(['']);
      },
      error: () => {
        this.errorMessage = 'Не удалось войти. Проверьте введенные данные';
      },
    });
  }
  signUp(name: string, email: string, password: string) {
    this.authService.register(name, email, password).subscribe({
      next: () => {
        this.toggleAuthMode();
      },
      error: () => {
        this.errorMessage = 'Регистрация не прошла. Повторите попытку позже.';
      },
    });
  }
  onSubmit() {
    const { name, email, password } = this.loginForm.value;
    if (this.loginForm.valid) {
      this.signIn(email, password);
    } else {
      this.signUp(name, email, password);
    }
  }
  closeModal() {
    this.close.emit();
  }
}
