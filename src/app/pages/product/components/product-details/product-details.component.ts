import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { Ingredient } from '../../../../shared/services/ingredients/ingredients.model';
import { Product } from '../../../../shared/services/products/products.model';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { IngredientSelectorComponent } from './ingredient-selector/ingredient-selector.component';

@Component({
  selector: 'product-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IngredientSelectorComponent,
    BreadcrumbComponent,
    LoaderComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  @Input({ required: true }) product!: Product;
  @Input({ required: true }) ingredients!: Ingredient[];
  @Input({ required: true }) orderForm!: FormGroup;
  @Input({ required: true }) totalPrice!: number;
  @Output() onSubmitForm = new EventEmitter();
  @Output() onUpdatePrice = new EventEmitter();

  handleUpdatePrice() {
    this.onUpdatePrice.emit();
  }
  handleSubmitForm(e: Event) {
    e.preventDefault();
    this.onSubmitForm.emit();
  }
}
