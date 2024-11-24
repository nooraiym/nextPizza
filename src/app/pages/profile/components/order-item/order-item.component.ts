import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule, Minus, Plus, X } from 'lucide-angular';
import { OrderProduct } from '../../../../shared/services/orders/orders.model';

@Component({
  selector: 'order-item',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
})
export class OrderItemComponent implements OnInit {
  readonly Minus = Minus;
  readonly Plus = Plus;
  readonly X = X;
  private route = inject(ActivatedRoute);
  // TODO: required: true
  @Input() product!: OrderProduct;
  isOrdersPage = false;

  ngOnInit(): void {
    const path = this.route.snapshot.data['path'];
    this.isOrdersPage = path === 'my-orders';
  }
}
