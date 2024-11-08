import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'dropdown-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.scss',
})
export class DropdownMenuComponent {
  private authService = inject(AuthService);

  logOut(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }
}
