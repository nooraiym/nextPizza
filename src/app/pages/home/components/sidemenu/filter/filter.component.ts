import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../../../../shared/services/ingredients/ingredients.model';
import { IngredientsService } from '../../../../../shared/services/ingredients/ingredients.service';
import { FilterType } from './filter.model';

@Component({
  selector: 'filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit, OnDestroy {
  FilterType = FilterType;
  @Input({ required: true }) filterType!: FilterType;
  private ingredientsService = inject(IngredientsService);
  private ingredientsSubscription!: Subscription;
  ingredients: Ingredient[] = [];
  showAllOptions = false;

  ngOnInit(): void {
    this.ingredientsSubscription = this.ingredientsService
      .getAllIngredients()
      .subscribe((data) => {
        this.ingredients = data;
      });
  }

  toggleShowAll() {
    this.showAllOptions = !this.showAllOptions;
  }

  ngOnDestroy(): void {
    this.ingredientsSubscription.unsubscribe();
  }
}
