import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, User } from 'lucide-angular';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'user-actions',
  standalone: true,
  imports: [LucideAngularModule, DropdownComponent],
  templateUrl: './user-actions.component.html',
  styleUrl: './user-actions.component.scss',
})
export class UserActionsComponent {
  readonly User = User;
  @Input({ required: true }) isDropdownOpen!: boolean;
  @Output() toggleDropdown = new EventEmitter<void>();

  toggleDropdownMenu() {
    this.toggleDropdown.emit();
  }
}
