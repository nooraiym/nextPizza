import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { ContainerDirective } from '../../../shared/directives/container.directive';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { SidemenuComponent } from '../components/sidemenu/sidemenu.component';
import { SortComponent } from '../components/sort/sort.component';

@Component({
  selector: 'home-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    ContainerDirective,
    HeaderComponent,
    NavigationComponent,
    SortComponent,
    SidemenuComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class HomeLayoutComponent {}
