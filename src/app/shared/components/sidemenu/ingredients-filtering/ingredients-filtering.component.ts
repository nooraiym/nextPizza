import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ingredient } from '../../../services/ingredients/ingredients.model';

@Component({
  selector: 'ingredients-filtering',
  standalone: true,
  imports: [],
  templateUrl: './ingredients-filtering.component.html',
  styleUrl: './ingredients-filtering.component.scss',
})
export class IngredientsFilteringComponent {
  @Input({ required: true }) ingredients!: Ingredient[];
  @Input({ required: true }) showAllIngredients: boolean = false;
  @Output() onToggleShowAll = new EventEmitter();

  handleToggleShowAll() {
    this.onToggleShowAll.emit();
  }
}
