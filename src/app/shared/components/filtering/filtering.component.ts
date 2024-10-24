import { Component, Input } from '@angular/core';

type Mode = 'category' | 'cost' | 'ingredients' | 'typeOfCrust';

@Component({
  selector: 'app-filtering',
  standalone: true,
  imports: [],
  templateUrl: './filtering.component.html',
  styleUrl: './filtering.component.scss',
})
export class FilteringByNewestComponent {
  @Input({ required: true }) mode!: Mode;
  ingredients = [
    { id: 'cheeseSouce', name: 'Сырный соус' },
    { id: 'mozzarella', name: 'Моцарелла' },
    { id: 'garlic', name: 'Моцарелла' },
    { id: 'pickles', name: 'Маринованные огурчики' },
    { id: 'onions', name: 'Красный лук' },
    { id: 'tomatoes', name: 'Томаты' },
  ];
}
