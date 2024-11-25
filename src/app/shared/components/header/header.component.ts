import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { CartService } from '../../services/cart/cart.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { AuthActionsComponent } from './auth-actions/auth-actions.component';
import { CartActionsComponent } from './cart-actions/cart-actions.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { SideCartComponent } from './side-cart/side-cart.component';
import { UserActionsComponent } from './user-actions/user-actions.component';

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
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private subscriptions: Subscription[] = [];
  isCartOpen = false;
  isAuthModalOpen = false;
  isAuthenticated = false;
  isProfilePage = false;
  isCartEmpty = true;

  ngOnInit() {
    const path = this.route.snapshot.data['path'];
    this.isProfilePage = path === 'profile';
    const authSubscription = this.authService.isAuthenticatedSubject$.subscribe(
      (isLoggedIn) => {
        this.isAuthenticated = isLoggedIn;
      }
    );
    const cartSubscription = this.cartService.cart$.subscribe((cart) => {
      this.isCartEmpty = cart.products.length === 0;
    });
    this.subscriptions.push(authSubscription, cartSubscription);
  }

  handleToggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }
  handleCloseCart() {
    this.isCartOpen = false;
  }
  handleOpenAuthModal() {
    this.isAuthModalOpen = true;
  }
  handleCloseAuthModal() {
    this.isAuthModalOpen = false;
  }

  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
  }
}
