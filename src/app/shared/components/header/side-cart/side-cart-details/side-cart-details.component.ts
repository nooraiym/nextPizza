import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderProduct } from '../../../../services/orders/orders.model';
import { formatProductsCount } from '../../../../utils/format';
import { SideCartItemComponent } from '../side-cart-item/side-cart-item.component';
import { Ingredient } from '../../../../services/ingredients/ingredients.model';

@Component({
  selector: 'side-cart-details',
  standalone: true,
  imports: [SideCartItemComponent],
  templateUrl: './side-cart-details.component.html',
  styleUrl: './side-cart-details.component.scss',
})
export class SideCartDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  @Input({ required: true }) cartItems!: OrderProduct[];
  @Input({ required: true }) totalQuantity!: number;
  @Output() onDecrease = new EventEmitter<OrderProduct>();
  @Output() onIncrease = new EventEmitter<OrderProduct>();
  isCartPage = false;

  ngOnInit() {
    const path = this.route.snapshot.data['path'];
    this.isCartPage = path === 'my-cart';
  }

  handleDecrease(product: OrderProduct) {
    this.onDecrease.emit(product);
  }
  handleIncrease(product: OrderProduct) {
    this.onIncrease.emit(product);
  }
  getFormattedProductsCount() {
    return formatProductsCount(this.totalQuantity);
  }
}
