import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RootPageComponent } from './pages/home/page.component';
import { HeaderComponent } from "./shared/components/header/header.component";
import { SelectionComponent } from "./shared/components/selection/selection.component";
import { SidemenuComponent } from "./shared/components/sidemenu/sidemenu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RootPageComponent,
    HomeComponent,
    HeaderComponent,
    SelectionComponent,
    SidemenuComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'nextPizza';
}
