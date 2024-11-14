import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ingredient } from '../../../../../shared/services/ingredients/ingredients.model';

@Component({
  selector: 'ingredient-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingredient-selector.component.html',
  styleUrl: './ingredient-selector.component.scss',
})
export class IngredientSelectorComponent {
  options!: Ingredient[];
  @Input({ required: true }) option!: any;
  @Output() onSelectoption = new EventEmitter();

  handleSelectOption(option: any) {
    option.selected = !option.selected;
    this.onSelectoption.emit();
  }
}
