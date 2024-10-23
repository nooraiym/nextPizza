import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ContainerDirective } from '../../shared/directives/container.directive';
import { InputComponent } from '../../shared/ui/input/input.component';
import { TitleComponent } from "../../shared/ui/title/title.component";
import { SelectionComponent } from "../../shared/components/selection/selection.component";

@Component({
  selector: 'main[home]',
  standalone: true,
  imports: [HeaderComponent, ContainerDirective, InputComponent, TitleComponent, SelectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
