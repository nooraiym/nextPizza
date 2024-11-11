import { Component, EventEmitter, Input, Output } from '@angular/core';
import { _ingredients } from '../../../../../../mock/ingredients';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ingredient-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingredient-selector.component.html',
  styleUrl: './ingredient-selector.component.scss',
})
export class IngredientSelectorComponent {
  options = _ingredients;
  @Input({ required: true }) option!: any;
  @Output() onSelectoption = new EventEmitter();

  handleSelectOption(option: any) {
    option.selected = !option.selected;
    this.onSelectoption.emit();
  }
}
