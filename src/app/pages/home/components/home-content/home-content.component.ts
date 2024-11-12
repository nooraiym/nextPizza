import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../../shared/services/all-products/all-products.model';
import { AllProductsService } from '../../../../shared/services/all-products/all-products.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductCardType } from '../product-card/product-card.model';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'home-content',
  standalone: true,
  imports: [SkeletonComponent, ProductCardComponent, PaginationComponent],
  templateUrl: './home-content.component.html',
  styleUrl: './home-content.component.scss',
})
export class HomeContentComponent implements OnInit, OnDestroy {
  ProductCardType = ProductCardType;
  private allProductsService = inject(AllProductsService);
  private allProductsSubscription!: Subscription;
  products: Product[] = [];
  isLoading = true;

  ngOnInit() {
    setTimeout(() => {
      this.allProductsSubscription = this.allProductsService
        .getAllProducts()
        .subscribe({
          next: (data) => {
            this.products = data;
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error loading products:', error);
            this.isLoading = false;
          },
        });
    }, 1500);
  }

  ngOnDestroy(): void {
    this.allProductsSubscription.unsubscribe();
  }
}
