import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'auth-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent implements OnDestroy {
  @Output() onClose = new EventEmitter<void>();
  private authService = inject(AuthService);
  private subscriptions: Subscription[] = [];
  private router = inject(Router);
  loginForm: FormGroup;
  isLoginMode = true;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  handleToggleAuthMode() {
    this.isLoginMode = !this.isLoginMode;
    this.loginForm.reset();
  }

  private signIn(email: string, password: string) {
    const loginSubscription = this.authService
      .login(email, password)
      .subscribe({
        next: () => {
          this.onClose.emit();
          this.router.navigate(['']);
        },
        error: (err) => {
          err.message = 'Неверные учетные данные';
        },
      });
    this.subscriptions.push(loginSubscription);
  }

  private signUp(username: string, email: string, password: string) {
    const registerSubscription = this.authService
      .register(username, email, password)
      .subscribe({
        next: () => {
          this.authService.login(email, password).subscribe({
            next: () => {
              this.onClose.emit();
              this.router.navigate(['']);
            },
            error: (err) => {
              err.message = 'Не удалось войти после регистрации';
            },
          });
        },
        error: (err) => {
          err.message = 'Регистрация не удалась';
        },
      });
    this.subscriptions.push(registerSubscription);
  }

  handleSubmit() {
    const { name, email, password } = this.loginForm.value;

    if (this.isLoginMode) {
      this.signIn(email, password);
    } else {
      this.signUp(name, email, password);
    }
  }

  handleCloseModal() {
    this.onClose.emit();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
