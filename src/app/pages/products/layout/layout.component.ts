import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { ContainerDirective } from '../../../shared/directives/container.directive';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, ContainerDirective, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class ProductsLayoutComponent {}
