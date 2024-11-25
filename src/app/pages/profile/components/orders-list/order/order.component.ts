import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChevronDown, LucideAngularModule } from 'lucide-angular';
import { Order } from '../../../../../shared/services/orders/orders.model';
import { StatusBadgeComponent } from '../../status-badge/status-badge.component';
import { PaymentStatus } from '../../status-badge/status-badge.model';
import { OrderItemComponent } from '../order-item/order-item.component';

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
  @Input({ required: true }) order!: Order;
  isAccordionOpen = false;

  handleToggleAccordion() {
    this.isAccordionOpen = !this.isAccordionOpen;
  }
}
