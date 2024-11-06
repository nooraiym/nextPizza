import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { AuthActionsComponent } from './auth-actions/auth-actions.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { SideCartComponent } from './side-cart/side-cart.component';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { CartActionsComponent } from "./cart-actions/cart-actions.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SearchInputComponent,
    SideCartComponent,
    AuthModalComponent,
    AuthActionsComponent,
    UserActionsComponent,
    CartActionsComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private routerSubscription: Subscription;
  private authSubscription!: Subscription;
  private authService = inject(AuthService);

  @Input({ required: true }) mode: 'main' | 'profile' = 'main';

  isCartOpen = false;
  isDropdownOpen = false;
  isAuthModalOpen = false;
  isAuthenticated = false;

  constructor(private router: Router) {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isDropdownOpen = false;
      }
    });
  }

  ngOnInit() {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      (isLoggedIn) => {
        this.isAuthenticated = isLoggedIn;
      }
    );
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  closeCart() {
    this.isCartOpen = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  openAuthModal() {
    this.isAuthModalOpen = true;
  }

  closeAuthModal() {
    this.isAuthModalOpen = false;
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
