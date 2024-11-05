import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'auth-actions',
  standalone: true,
  imports: [],
  templateUrl: './auth-actions.component.html',
  styleUrl: './auth-actions.component.scss',
})
export class AuthActionsComponent {
  @Output() toggleCart = new EventEmitter<void>();
  @Output() openAuthModal = new EventEmitter<void>();

  toggleSideCart() {
    this.toggleCart.emit();
  }

  openAuthModalView() {
    this.openAuthModal.emit();
  }
}
