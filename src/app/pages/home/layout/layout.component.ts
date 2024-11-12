import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { PageType } from '../../../shared/components/header/header.model';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { SidemenuComponent } from '../components/sidemenu/sidemenu.component';
import { SortComponent } from '../components/sort/sort.component';

@Component({
  selector: 'home-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    NavigationComponent,
    SortComponent,
    SidemenuComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class HomeLayoutComponent {
  PageType = PageType;
}
