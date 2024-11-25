import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../../../shared/services/cart/cart.service';
import { OrderProduct } from '../../../../shared/services/orders/orders.model';
import { PersonalInfoComponent } from '../personal-info/personal-info.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CartTotalsComponent } from './cart-totals/cart-totals.component';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [
    PersonalInfoComponent,
    CartTotalsComponent,
    CartDetailsComponent,
    AddressFormComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  private cartService = inject(CartService);
  private cartSubscription!: Subscription;
  cartProducts: OrderProduct[] = [];
  totalCartCost: number = 0;
  totalCartCostWithDelivery: number = 0;
  totalFee: number = 0;

  ngOnInit() {
    this.cartSubscription = this.cartService.cart$.subscribe((cart) => {
      this.cartProducts = cart.products;
      this.totalCartCost = cart.totalCost;
      this.totalCartCostWithDelivery = cart.totalCostWithDelivery;
      this.totalFee = Math.round((this.totalCartCost * 5) / 100);
    });
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
