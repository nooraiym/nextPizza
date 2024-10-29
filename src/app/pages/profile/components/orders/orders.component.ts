import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderComponent } from '../order/order.component';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent, OrderComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  isAccordionOpen = true;

  toggleAccordion() {
    this.isAccordionOpen = !this.isAccordionOpen;
  }
}
