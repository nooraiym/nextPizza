import { Component } from '@angular/core';
import { FilteringByNewestComponent } from "../filtering/filtering.component";

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [FilteringByNewestComponent],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent {

}
