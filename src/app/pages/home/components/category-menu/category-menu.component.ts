import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from '../../../../shared/services/categories/ingredients.model';
import { CategoriesService } from '../../../../shared/services/categories/ingredients.service';

@Component({
  selector: 'category-menu',
  standalone: true,
  imports: [],
  templateUrl: './category-menu.component.html',
  styleUrl: './category-menu.component.scss',
})
export class CategoryMenuComponent implements OnInit, OnDestroy {
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

  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }
}
