import { Component } from '@angular/core';
import { IngredientsFilteringComponent } from './ingredients-filtering/ingredients-filtering.component';
import { NewestFilteringComponent } from './newest-filtering/newest-filtering.component';
import { PriceFilteringComponent } from './price-filtering/price-filtering.component';

@Component({
  selector: 'sidemenu',
  standalone: true,
  imports: [
    NewestFilteringComponent,
    IngredientsFilteringComponent,
    PriceFilteringComponent,
  ],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss',
})
export class SidemenuComponent {}
