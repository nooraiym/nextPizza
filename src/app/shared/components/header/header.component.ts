import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { CartService } from '../../services/cart/cart.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { AuthActionsComponent } from './auth-actions/auth-actions.component';
import { CartActionsComponent } from './cart-actions/cart-actions.component';
import { HeaderStateService } from './header.service';
import { SearchInputComponent } from './search-input/search-input.component';
import { SideCartComponent } from './side-cart/side-cart.component';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
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
isSearchFocused: any;
handleSearchFocus() {
throw new Error('Method not implemented.');
}
  readonly Search = Search;
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private headerStateService = inject(HeaderStateService);
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
    const authModalSubscription =
      this.headerStateService.authModalOpen$.subscribe((isOpen) => {
        this.isAuthModalOpen = isOpen;
      });
    this.subscriptions.push(
      authSubscription,
      cartSubscription,
      authModalSubscription
    );
  }

  handleToggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }
  handleCloseCart() {
    this.isCartOpen = false;
  }
  handleOpenAuthModal() {
    this.headerStateService.openAuthModal();
  }
  handleCloseAuthModal() {
    this.headerStateService.closeAuthModal();
  }

  ngOnDestroy() {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
  }
}
