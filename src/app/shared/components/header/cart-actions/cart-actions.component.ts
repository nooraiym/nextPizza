import { Component, EventEmitter, Output } from '@angular/core';
import { LucideAngularModule, ShoppingCart } from 'lucide-angular';

@Component({
  selector: 'cart-actions',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './cart-actions.component.html',
  styleUrl: './cart-actions.component.scss',
})
export class CartActionsComponent {
  readonly ShoppingCart = ShoppingCart;
  @Output() onToggleCart = new EventEmitter<void>();
  isCartOpen = false;

  handleToggleSideCart() {
    this.onToggleCart.emit();
  }
}
