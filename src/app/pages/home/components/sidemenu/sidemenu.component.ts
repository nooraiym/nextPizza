import { Component } from '@angular/core';
import { FilterComponent } from './filter/filter.component';
import { FilterType } from './filter/filter.model';

@Component({
  selector: 'sidemenu',
  standalone: true,
  imports: [FilterComponent],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss',
})
export class SidemenuComponent {
  FilterType = FilterType;
}
