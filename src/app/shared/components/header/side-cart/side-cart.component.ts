import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, MoveLeft } from 'lucide-angular';

@Component({
  selector: 'side-cart',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './side-cart.component.html',
  styleUrl: './side-cart.component.scss',
})
export class SideCartComponent {
  readonly MoveLeft = MoveLeft;
  @Input() isOpen = false;
  @Output() closeCart = new EventEmitter<void>();
  empty = true;
    isCartOpen = false;

  close() {
    this.closeCart.emit();
  }
}
