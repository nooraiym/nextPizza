import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../../shared/services/all-products/all-products.model';
import { Ingredient } from '../../../../shared/services/ingredients/ingredients.model';
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
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  orderForm: FormGroup;
  product!: Product;
  options!: Ingredient[];
  basePrice!: number;
  totalPrice!: number;

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      size: ['30'],
      crust: ['traditional'],
    });
  }

  ngOnInit(): void {
    this.options = this.route.snapshot.data['ingredients'];
    this.product = this.route.snapshot.data['product'];
    this.basePrice = this.product.price;
    this.totalPrice = this.basePrice;
    if (!this.product) {
      console.warn('Product data could not be loaded.');
    }
  }

  updatePrice() {
    const selectedOptions = this.options.filter((opt) => opt.selected);
    const additionalPrice = selectedOptions.reduce(
      (sum, opt) => sum + opt.price,
      0
    );
    this.totalPrice = this.basePrice + additionalPrice;
  }
  handleSelectOption() {
    this.updatePrice();
  }
  handleSubmit(e: Event) {
    e.preventDefault();
    console.log('Выбранный размер:', this.orderForm.value.size);
    console.log('Выбранная корочка:', this.orderForm.value.crust);
  }
}
