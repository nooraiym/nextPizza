import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { AuthActionsComponent } from './auth-actions/auth-actions.component';
import { CartActionsComponent } from './cart-actions/cart-actions.component';
import { PageType } from './header.model';
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
  @Input({ required: true }) pageType: PageType = PageType.Main;
  private authSubscription!: Subscription;
  private authService = inject(AuthService);
  isCartOpen = false;
  isAuthModalOpen = false;
  isAuthenticated = false;

  ngOnInit() {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      (isLoggedIn) => {
        this.isAuthenticated = isLoggedIn;
      }
    );
  }

  isMainPage(): boolean {
    return this.pageType === PageType.Main;
  }
  isProfilePage(): boolean {
    return this.pageType === PageType.Profile;
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
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
