import { Component, Input } from '@angular/core';
import { PaymentStatus } from './status-badge.model';

@Component({
  selector: 'status-badge',
  standalone: true,
  imports: [],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss',
})
export class StatusBadgeComponent {
  @Input() status!: PaymentStatus;
  PaymentStatus = PaymentStatus;
}
