import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, Minus, Plus, X } from 'lucide-angular';

@Component({
  selector: 'quantity-selector',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './quantity-selector.component.html',
  styleUrl: './quantity-selector.component.scss',
})
export class QuantitySelectorComponent {
  @Input({ required: true }) productQuantity: number = 0;
  @Output() onDecrease = new EventEmitter<void>();
  @Output() onIncrease = new EventEmitter<void>();
  readonly Minus = Minus;
  readonly Plus = Plus;
  readonly X = X;

  handleDecrease() {
    this.onDecrease.emit();
  }
  handleIncrease() {
    this.onIncrease.emit();
  }
}
