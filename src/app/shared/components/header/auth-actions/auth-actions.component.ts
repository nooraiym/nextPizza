import { Component, EventEmitter, Output } from '@angular/core';
import { LucideAngularModule, User } from 'lucide-angular';

@Component({
  selector: 'auth-actions',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './auth-actions.component.html',
  styleUrl: './auth-actions.component.scss',
})
export class AuthActionsComponent {
  readonly User = User;
  @Output() openAuthModal = new EventEmitter<void>();

  openAuthModalView() {
    this.openAuthModal.emit();
  }
}
