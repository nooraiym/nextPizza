import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownComponent } from "../dropdown/dropdown.component";

@Component({
  selector: 'user-actions',
  standalone: true,
  imports: [DropdownComponent],
  templateUrl: './user-actions.component.html',
  styleUrl: './user-actions.component.scss',
})
export class UserActionsComponent {
  @Input({ required: true }) isDropdownOpen!: boolean;
  @Output() toggleDropdown = new EventEmitter<void>();

  toggleDropdownMenu() {
    this.toggleDropdown.emit();
  }
}
