import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'access-denied',
  standalone: true,
  imports: [],
  templateUrl: './access-denied.component.html',
  styleUrl: './access-denied.component.scss',
})
export class AccessDeniedComponent {
  private router = inject(Router);

  onClick() {
    this.router.navigate(['']);
  }
}
