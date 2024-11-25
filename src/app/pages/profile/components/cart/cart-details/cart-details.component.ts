import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OrderProduct } from '../../../../../shared/services/orders/orders.model';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'cart-details',
  standalone: true,
  imports: [CartItemComponent],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.scss',
})
export class CartDetailsComponent {
  private router = inject(Router);
  @Input({ required: true }) cartItems!: OrderProduct[];
  @Output() onDecrease = new EventEmitter<OrderProduct>();
  @Output() onIncrease = new EventEmitter<OrderProduct>();

  handleDecrease(product: OrderProduct) {
    this.onDecrease.emit(product);
  }
  handleIncrease(product: OrderProduct) {
    this.onIncrease.emit(product);
  }
  handleRedirect() {
    this.router.navigate(['']);
  }
}
