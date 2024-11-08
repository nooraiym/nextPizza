import { Component } from '@angular/core';
import { LucideAngularModule, Package, Percent, Truck } from 'lucide-angular';

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
}
