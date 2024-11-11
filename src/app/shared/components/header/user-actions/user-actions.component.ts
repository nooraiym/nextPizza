import { Component } from '@angular/core';
import { LucideAngularModule, User } from 'lucide-angular';
import { DropdownMenuComponent } from '../../dropdown-menu/dropdown-menu.component';

@Component({
  selector: 'user-actions',
  standalone: true,
  imports: [LucideAngularModule, DropdownMenuComponent],
  templateUrl: './user-actions.component.html',
  styleUrl: './user-actions.component.scss',
})
export class UserActionsComponent {
  readonly User = User;
  isDropdownOpen = false;

  handleToggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
