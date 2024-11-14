import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule, MoveLeft } from 'lucide-angular';
import { PageType } from '../../shared/components/header/header.model';
import { HeaderComponent } from "../../shared/components/header/header.component";

@Component({
  selector: 'page-not-found',
  standalone: true,
  imports: [LucideAngularModule, HeaderComponent],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {
  PageType = PageType;
  readonly MoveLeft = MoveLeft;
  private router = inject(Router);

  handleRedirect() {
    this.router.navigate(['']);
  }
}
