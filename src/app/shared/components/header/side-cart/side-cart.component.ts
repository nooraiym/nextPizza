import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, MoveLeft, MoveRight } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { CartService } from '../../../services/cart/cart.service';
import { OrderProduct } from '../../../services/orders/orders.model';
import { SideCartDetailsComponent } from './side-cart-details/side-cart-details.component';
import { Ingredient } from '../../../services/ingredients/ingredients.model';

@Component({
  selector: 'side-cart',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, SideCartDetailsComponent],
  templateUrl: './side-cart.component.html',
  styleUrl: './side-cart.component.scss',
})
export class SideCartComponent implements OnInit, OnDestroy {
  readonly MoveLeft = MoveLeft;
  readonly MoveRight = MoveRight;
  private cartService = inject(CartService);
  private cartSubscription!: Subscription;
  @Input() isOpen = false;
  @Output() onCloseCart = new EventEmitter<void>();
  cartProducts: OrderProduct[] = [];
  totalCartCost: number = 0;
  totalQuantity: number = 0;
  totalFee: number = 0;
  isCartOpen = false;

  ngOnInit() {
    this.cartSubscription = this.cartService.cart$.subscribe((cart) => {
      this.cartProducts = cart.products;
      this.totalCartCost = cart.totalCost;
      this.totalFee = Math.round((this.totalCartCost * 5) / 100);
      this.totalQuantity = this.cartService.getTotalQuantity();
    });
  }

  get isCartEmpty(): boolean {
    return this.cartProducts.length === 0;
  }
  handleCloseCart() {
    this.onCloseCart.emit();
  }
  increaseQuantity(product: OrderProduct) {
    this.cartService.increaseQuantity(product.id, product.extraOptions);
  }
  decreaseQuantity(product: OrderProduct) {
    this.cartService.decreaseQuantity(product.id, product.extraOptions);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}
