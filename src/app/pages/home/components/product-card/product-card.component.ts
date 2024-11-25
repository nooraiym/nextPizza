import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { QuantitySelectorComponent } from '../../../../shared/components/quantity-selector/quantity-selector.component';
import { OrderProduct } from '../../../../shared/services/orders/orders.model';
import { Product } from '../../../../shared/services/products/products.model';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [
    LucideAngularModule,
    RouterLink,
    CommonModule,
    QuantitySelectorComponent,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  readonly Plus = Plus;
  private route = inject(ActivatedRoute);
  @Input({ required: true }) product!: Product;
  @Input({ required: true }) cartProducts!: OrderProduct[];
  @Input({ required: true }) isCartEmpty!: boolean;
  @Output() onAddProductToCart = new EventEmitter<Product>();
  @Output() onDecrease = new EventEmitter<OrderProduct>();
  @Output() onIncrease = new EventEmitter<OrderProduct>();
  isDetailedType = false;
  orderProduct?: OrderProduct;

  ngOnInit(): void {
    const path = this.route.snapshot.routeConfig?.path;
    this.isDetailedType = path === 'products/:productId';
    this.updateOrderProduct();
  }

  handleAddProductToCart(product: Product) {
    this.onAddProductToCart.emit(product);
    this.orderProduct = {
      ...this.product,
      shortDescription: { size: '30', crust: 'traditional' },
      extraOptions: [],
      quantity: 1,
      totalPrice: this.product.price,
    };
  }
  handleDecrease() {
    if (this.orderProduct) {
      this.onDecrease.emit(this.orderProduct);
      this.orderProduct.quantity--;
      if (this.orderProduct.quantity <= 0) {
        this.orderProduct = undefined;
      }
    }
  }
  handleIncrease() {
    if (this.orderProduct) {
      this.onIncrease.emit(this.orderProduct);
      this.orderProduct.quantity++;
    }
  }
  updateOrderProduct(): void {
    this.orderProduct = this.cartProducts.find(
      (orderProduct) => orderProduct.name === this.product.name
    );
  }
}
