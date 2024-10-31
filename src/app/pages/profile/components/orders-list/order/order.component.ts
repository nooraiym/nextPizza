import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { StatusBadgeComponent } from '../../status-badge/status-badge.component';
import { OrderItemComponent } from '../order-item/order-item.component';
import { Order } from '../orders-list.component';

@Component({
  selector: 'order',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent, OrderItemComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  @Input({ required: true }) orderData!: Order;
  isAccordionOpen = false;

  toggleAccordion() {
    this.isAccordionOpen = !this.isAccordionOpen;
  }
}
