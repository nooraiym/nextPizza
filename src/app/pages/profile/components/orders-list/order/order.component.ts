import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChevronDown, LucideAngularModule } from 'lucide-angular';
import { OrderItemType } from '../../../profile.model';
import { OrderItemComponent } from '../../order-item/order-item.component';
import { StatusBadgeComponent } from '../../status-badge/status-badge.component';
import { Order } from '../orders-list.component';
import { PaymentStatus } from '../../status-badge/status-badge.model';

@Component({
  selector: 'order',
  standalone: true,
  imports: [
    LucideAngularModule,
    CommonModule,
    StatusBadgeComponent,
    OrderItemComponent,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  readonly ChevronDown = ChevronDown;
  PaymentStatus = PaymentStatus;
  OrderItemType = OrderItemType;
  @Input({ required: true }) orderData!: Order;
  isAccordionOpen = false;

  handleToggleAccordion() {
    this.isAccordionOpen = !this.isAccordionOpen;
  }
}
