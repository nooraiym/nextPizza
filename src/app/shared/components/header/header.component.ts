import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchInputComponent } from './search-input/search-input.component';
import { SideCartComponent } from "./side-cart/side-cart.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchInputComponent, SideCartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input({ required: true }) mode: 'main' | 'profile' = 'main';
  isCartOpen = false;

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  closeCart() {
    this.isCartOpen = false;
  }
}
