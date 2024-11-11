import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule, MoveLeft } from 'lucide-angular';

@Component({
  selector: 'access-denied',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './access-denied.component.html',
  styleUrl: './access-denied.component.scss',
})
export class AccessDeniedComponent {
  readonly MoveLeft = MoveLeft;
  private router = inject(Router);

  onClick() {
    this.router.navigate(['']);
  }
}
