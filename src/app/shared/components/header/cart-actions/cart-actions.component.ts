import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, ShoppingCart } from 'lucide-angular';

@Component({
  selector: 'cart-actions',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './cart-actions.component.html',
  styleUrl: './cart-actions.component.scss',
})
export class CartActionsComponent {
  readonly ShoppingCart = ShoppingCart;
  @Input({ required: true }) isCartEmpty!: boolean;
  @Output() onToggleCart = new EventEmitter<void>();
  isCartOpen = false;

  handleToggleSideCart() {
    this.onToggleCart.emit();
  }
}
