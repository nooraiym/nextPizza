import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule, MoveLeft } from 'lucide-angular';

@Component({
  selector: 'page-not-found',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {
  readonly MoveLeft = MoveLeft;
  private router = inject(Router);

  handleRedirect() {
    this.router.navigate(['']);
  }
}
