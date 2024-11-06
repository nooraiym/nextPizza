import { Component, Input } from '@angular/core';

@Component({
  selector: 'order-item',
  standalone: true,
  imports: [],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
})
export class OrderItemComponent {
  @Input({ required: true }) mode!: 'my-orders' | 'my-cart';
}
