import { Component, Input } from '@angular/core';
import { LucideAngularModule, Minus, Plus, X } from 'lucide-angular';

@Component({
  selector: 'order-item',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
})
export class OrderItemComponent {
  readonly Minus = Minus;
  readonly Plus = Plus;
  readonly X = X;
  @Input({ required: true }) mode!: 'my-orders' | 'my-cart';
}
