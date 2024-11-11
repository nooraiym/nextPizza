import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { PageType } from '../../../shared/components/header/header.model';

@Component({
  selector: 'not-found-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class NotFoundLayoutComponent {
  PageType = PageType;
}
