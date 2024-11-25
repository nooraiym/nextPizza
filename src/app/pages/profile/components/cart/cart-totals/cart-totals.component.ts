import { Component, Input } from '@angular/core';
import { LucideAngularModule, Package, Percent, Truck } from 'lucide-angular';
import { DELIVERY_COST } from '../../../../../shared/constants';

@Component({
  selector: 'cart-totals',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './cart-totals.component.html',
  styleUrl: './cart-totals.component.scss',
})
export class CartTotalsComponent {
  readonly Package = Package;
  readonly Percent = Percent;
  readonly Truck = Truck;
  @Input({ required: true }) totalCartCost!: number;
  @Input({ required: true }) totalCartCostWithDelivery!: number;
  @Input({ required: true }) totalFee!: number;
  deliveryCost = this.totalCartCost > 0 ? DELIVERY_COST : 0;
}
