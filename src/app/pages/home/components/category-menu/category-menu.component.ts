import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../../shared/services/categories/categories.model';

@Component({
  selector: 'category-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-menu.component.html',
  styleUrl: './category-menu.component.scss',
})
export class CategoryMenuComponent {
  @Input({ required: true }) categories: Category[] = [];
  @Input({ required: true }) activeCategory!: string;
  @Output() onScrollToCategory = new EventEmitter();

  handleScrollToCategory(anchor: string) {
    this.onScrollToCategory.emit(anchor);
  }
}
