import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from '../../../../../shared/services/categories/ingredients.model';
import { CategoriesService } from '../../../../../shared/services/categories/ingredients.service';

@Component({
  selector: 'category-filtering',
  standalone: true,
  imports: [],
  templateUrl: './category-filtering.component.html',
  styleUrl: './category-filtering.component.scss',
})
export class CategoryFilteringComponent {
  private categoriesService = inject(CategoriesService);
  private categoriesSubscription!: Subscription;
  categories: Category[] = [];
  showAllOptions = false;

  ngOnInit(): void {
    this.categoriesSubscription = this.categoriesService
      .getAllCategories()
      .subscribe((data) => {
        this.categories = data;
      });
  }

  toggleShowAll() {
    this.showAllOptions = !this.showAllOptions;
  }

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }
}
