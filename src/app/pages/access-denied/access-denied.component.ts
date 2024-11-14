import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule, MoveLeft } from 'lucide-angular';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { PageType } from '../../shared/components/header/header.model';

@Component({
  selector: 'access-denied',
  standalone: true,
  imports: [LucideAngularModule, HeaderComponent],
  templateUrl: './access-denied.component.html',
  styleUrl: './access-denied.component.scss',
})
export class AccessDeniedComponent {
  PageType = PageType;
  readonly MoveLeft = MoveLeft;
  private router = inject(Router);

  handleRedirect() {
    this.router.navigate(['']);
  }
}
