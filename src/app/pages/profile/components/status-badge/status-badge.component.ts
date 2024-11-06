import { Component, Input } from '@angular/core';

@Component({
  selector: 'status-badge',
  standalone: true,
  imports: [],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss',
})
export class StatusBadgeComponent {
  @Input() status?: 'pending' | 'paid' | 'rejected';
}
