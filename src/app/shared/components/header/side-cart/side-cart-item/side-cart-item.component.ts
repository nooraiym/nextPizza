import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ingredient } from '../../../../services/ingredients/ingredients.model';
import {
  OrderDescription,
  OrderProduct,
} from '../../../../services/orders/orders.model';
import { QuantitySelectorComponent } from '../../../quantity-selector/quantity-selector.component';
import { formatExtraOptions, formatOrderDescription } from '../../../../utils/format';

@Component({
  selector: 'side-cart-item',
  standalone: true,
  imports: [QuantitySelectorComponent],
  templateUrl: './side-cart-item.component.html',
  styleUrl: './side-cart-item.component.scss',
})
export class SideCartItemComponent {
  @Input({ required: true }) product!: OrderProduct;
  @Output() onDecrease = new EventEmitter<OrderProduct>();
  @Output() onIncrease = new EventEmitter<OrderProduct>();

  handleDecrease() {
    this.onDecrease.emit(this.product);
  }
  handleIncrease() {
    this.onIncrease.emit(this.product);
  }
  getFormattedDescription(orderDescription: OrderDescription) {
    return formatOrderDescription(orderDescription);
  }
  getFormattedOptions(extraOptions: Ingredient[]) {
    return formatExtraOptions(extraOptions);
  }
}
