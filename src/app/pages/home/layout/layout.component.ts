import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { SelectionComponent } from '../../../shared/components/selection/selection.component';
import { SidemenuComponent } from '../../../shared/components/sidemenu/sidemenu.component';

@Component({
  selector: 'home-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SelectionComponent,
    SidemenuComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class HomeLayoutComponent {}
