import { Component, EventEmitter, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'dropdown',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
private authService = inject(AuthService)

  logOut(event: Event) {
    event.preventDefault()
    this.authService.logout()
  }
}
