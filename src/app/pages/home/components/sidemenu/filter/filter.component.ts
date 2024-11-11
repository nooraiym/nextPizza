import { Component, Input } from '@angular/core';
import { FilterType } from './filter.model';

@Component({
  selector: 'filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  @Input({ required: true }) filterType!: FilterType;
  FilterType = FilterType;
  ingredients = [
    { id: 'cheeseSouce', name: 'Сырный соус' },
    { id: 'mozzarella', name: 'Моцарелла' },
    { id: 'garlic', name: 'Чеснок' },
    { id: 'pickles', name: 'Маринованные огурчики' },
    { id: 'onions', name: 'Красный лук' },
    { id: 'tomatoes', name: 'Томаты' },
  ];
}
