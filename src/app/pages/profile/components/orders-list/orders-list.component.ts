import { Component } from '@angular/core';
import { OrderComponent } from './order/order.component';

export type Order = {
  id: number;
  status: 'pending' | 'paid' | 'rejected';
  order: number;
  date: string;
};

@Component({
  selector: 'orders-list',
  standalone: true,
  imports: [OrderComponent],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss',
})
export class OrdersListComponent {
  //TODO: mock
  ordersList: Order[] = [
    {
      id: 1,
      status: 'paid',
      order: 15,
      date: '16 февраля 2024, в 20:31',
    },
    {
      id: 2,
      status: 'rejected',
      order: 16,
      date: '14 февраля 2024, в 17:45',
    },
    {
      id: 3,
      status: 'pending',
      order: 17,
      date: '11 февраля 2024, в 16:22',
    },
  ];
}
