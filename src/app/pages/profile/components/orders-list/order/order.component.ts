import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChevronDown, LucideAngularModule } from 'lucide-angular';
import { OrderItemType } from '../../../profile.model';
import { OrderItemComponent } from '../../order-item/order-item.component';
import { StatusBadgeComponent } from '../../status-badge/status-badge.component';
import { Order } from '../orders-list.component';

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
  OrderItemType = OrderItemType;
  @Input({ required: true }) orderData!: Order;
  isAccordionOpen = false;

  handleToggleAccordion() {
    this.isAccordionOpen = !this.isAccordionOpen;
  }
}
