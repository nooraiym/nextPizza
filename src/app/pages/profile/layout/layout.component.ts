import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'profile-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class ProfileLayoutComponent {}
