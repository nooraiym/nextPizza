import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Order, UserOrderList } from './orders.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private mockAPI = 'assets/data/ordersList.json';

  getAllOrders(): Observable<Order[]> {
    return from(
      fetch(this.mockAPI)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch orders');
          }
          return res.json();
        })
        .then((data) => data as UserOrderList)
        .then((data) => data.orders)
    ).pipe((data) => data);
  }
}
