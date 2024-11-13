import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../../../../shared/services/ingredients/ingredients.model';
import { IngredientsService } from '../../../../../shared/services/ingredients/ingredients.service';

@Component({
  selector: 'ingredients-filtering',
  standalone: true,
  imports: [],
  templateUrl: './ingredients-filtering.component.html',
  styleUrl: './ingredients-filtering.component.scss',
})
export class IngredientsFilteringComponent implements OnInit, OnDestroy {
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
