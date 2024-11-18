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
  styleUrl: './auth-modal.component.scss',
})
export class AuthModalComponent implements OnDestroy {
  @Output() onClose = new EventEmitter<void>();
  private authService = inject(AuthService);
  private authSubscription!: Subscription;
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

  handleToggleAuthMode() {
    this.isLoginMode = !this.isLoginMode;
    this.loginForm.reset();
  }
  signIn(email: string, password: string) {
    this.authSubscription = this.authService.login(email, password).subscribe({
      next: () => {
        this.onClose.emit();
        this.router.navigate(['']);
      },
    });
  }
  signUp(name: string, email: string, password: string) {
    this.authSubscription = this.authService
      .register(name, email, password)
      .subscribe({
        next: () => {
          this.handleToggleAuthMode();
        },
      });
  }
  handleSubmit() {
    const { name, email, password } = this.loginForm.value;
    if (this.loginForm.valid) {
      this.signUp(name, email, password);
    } else {
      this.signIn(email, password);
    }
  }
  handleCloseModal() {
    this.onClose.emit();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
