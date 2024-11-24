import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from '../../../../shared/services/orders/orders.model';
import { OrdersService } from '../../../../shared/services/orders/orders.service';
import { OrderComponent } from './order/order.component';

@Component({
  selector: 'orders-list',
  standalone: true,
  imports: [OrderComponent],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss',
})
export class OrdersListComponent implements OnInit, OnDestroy {
  private ordersservice = inject(OrdersService);
  private ordersSubscription!: Subscription;
  ordersList!: Order[];

  ngOnInit(): void {
    this.ordersSubscription = this.ordersservice
      .getAllOrders()
      .subscribe((data) => {
        this.ordersList = data;
      });
  }

  ngOnDestroy(): void {
    this.ordersSubscription.unsubscribe();
  }
}
