import { Component, Input } from '@angular/core';
import { LucideAngularModule, Minus, Plus, X } from 'lucide-angular';
import { OrderProduct } from '../../../../shared/services/orders/orders.model';
import { OrderItemType } from '../../profile.model';

@Component({
  selector: 'order-item',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
})
export class OrderItemComponent {
  readonly Minus = Minus;
  readonly Plus = Plus;
  readonly X = X;
  // TODO: избавиться от OrderItemType
  // TODO: required: true
  OrderItemType = OrderItemType;
  @Input({ required: true }) itemType!: OrderItemType;
  @Input() product!: OrderProduct;
}
