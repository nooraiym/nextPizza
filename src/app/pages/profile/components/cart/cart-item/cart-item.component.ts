import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { QuantitySelectorComponent } from '../../../../../shared/components/quantity-selector/quantity-selector.component';
import { Ingredient } from '../../../../../shared/services/ingredients/ingredients.model';
import {
  OrderDescription,
  OrderProduct,
} from '../../../../../shared/services/orders/orders.model';
import {
  formatExtraOptions,
  formatOrderDescription,
} from '../../../../../shared/utils/format';

@Component({
  selector: 'cart-item',
  standalone: true,
  imports: [QuantitySelectorComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  private router = inject(Router);
  @Input({ required: true }) product!: OrderProduct;
  @Output() onDecrease = new EventEmitter<OrderProduct>();
  @Output() onIncrease = new EventEmitter<OrderProduct>();

  handleDecrease() {
    this.onDecrease.emit(this.product);
  }
  handleIncrease() {
    this.onIncrease.emit(this.product);
  }
  handleNavigateToProduct(productId: number) {
    this.router.navigate(['products', productId]);
  }
  getFormattedDescription(orderDescription: OrderDescription) {
    return formatOrderDescription(orderDescription);
  }
  getFormattedOptions(extraOptions: Ingredient[]) {
    return formatExtraOptions(extraOptions);
  }
}
