import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cart-actions',
  standalone: true,
  imports: [],
  templateUrl: './cart-actions.component.html',
  styleUrl: './cart-actions.component.scss',
})
export class CartActionsComponent {
  @Output() toggleCart = new EventEmitter<void>();

  toggleSideCart() {
    this.toggleCart.emit();
  }
}
