import { Component, Input } from '@angular/core';
import { Category } from '../../../../shared/services/categories/categories.model';

@Component({
  selector: 'category-menu',
  standalone: true,
  imports: [],
  templateUrl: './category-menu.component.html',
  styleUrl: './category-menu.component.scss',
})
export class CategoryMenuComponent {
  @Input({ required: true }) categories: Category[] = [];
}
