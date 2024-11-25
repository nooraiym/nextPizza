import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { OrderProduct } from '../../../../../shared/services/orders/orders.model';

@Component({
  selector: 'order-item',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
})
export class OrderItemComponent implements OnInit {
  private route = inject(ActivatedRoute);
  @Input({ required: true }) product!: OrderProduct;
  isOrdersPage = false;
  isCartPage = false;

  ngOnInit(): void {
    const path = this.route.snapshot.data['path'];
    this.isOrdersPage = path === 'my-orders';
    this.isCartPage = path === 'my-cart';
  }
}
