import { Component } from '@angular/core';
import { FilteringByNewestComponent } from '../../shared/components/filtering/filtering.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SelectionComponent } from '../../shared/components/selection/selection.component';
import { SidemenuComponent } from '../../shared/components/sidemenu/sidemenu.component';
import { ContainerDirective } from '../../shared/directives/container.directive';
import { TitleComponent } from '../../shared/ui/title/title.component';

@Component({
  selector: 'main[home]',
  standalone: true,
  imports: [
    HeaderComponent,
    ContainerDirective,
    TitleComponent,
    SelectionComponent,
    FilteringByNewestComponent,
    SidemenuComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
