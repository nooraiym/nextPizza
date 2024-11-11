import { Component } from '@angular/core';
import { OrderItemType } from '../../../profile.model';
import { OrderItemComponent } from '../../order-item/order-item.component';

@Component({
  selector: 'cart-details',
  standalone: true,
  imports: [OrderItemComponent],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.scss',
})
export class CartDetailsComponent {
  OrderItemType = OrderItemType;
}
