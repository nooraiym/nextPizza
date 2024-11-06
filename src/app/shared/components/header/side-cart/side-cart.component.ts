import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'side-cart',
  standalone: true,
  imports: [],
  templateUrl: './side-cart.component.html',
  styleUrl: './side-cart.component.scss',
})
export class SideCartComponent {
  @Input() isOpen = false;
  @Output() closeCart = new EventEmitter<void>();
  empty = true;

  close() {
    this.closeCart.emit();
  }
}
