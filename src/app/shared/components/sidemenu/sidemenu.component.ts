import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../services/ingredients/ingredients.model';
import { IngredientsService } from '../../services/ingredients/ingredients.service';
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
export class SidemenuComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private ingredientsService = inject(IngredientsService);
  private paramsSubscription!: Subscription;
  private ingredientsSubscription!: Subscription;
  ingredients: Ingredient[] = [];
  showAllIngredients = false;
  isNewOnly: boolean = false;

  ngOnInit(): void {
    this.paramsSubscription = this.route.queryParams.subscribe((params) => {
      this.isNewOnly = params['isNewOnly'] === 'true';
    });
    this.ingredientsSubscription = this.ingredientsService
      .getAllIngredients()
      .subscribe((data) => {
        this.ingredients = data;
      });
  }

  toggleNewFilter(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.isNewOnly = checkbox.checked;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { isNewOnly: this.isNewOnly ? this.isNewOnly : null },
      queryParamsHandling: 'merge',
    });
  }
  toggleShowAll() {
    this.showAllIngredients = !this.showAllIngredients;
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    this.ingredientsSubscription.unsubscribe();
  }
}
