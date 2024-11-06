import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {
  private router = inject(Router);

  onClick() {
    this.router.navigate(['']);
  }
}
