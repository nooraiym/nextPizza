import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Product,
  TagQuery,
} from '../../../../shared/services/all-products/all-products.model';
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
  private route = inject(ActivatedRoute);
  private allProductsService = inject(AllProductsService);
  private allProductsSubscription!: Subscription;
  private queryParamsSubscription!: Subscription;
  products: Product[] = [];
  isLoading = true;

  ngOnInit() {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        const tag = params['tag'];
        if (tag) {
          tag === 'all'
            ? this.loadAllProducts()
            : this.filterProductsByTag(tag);
        } else {
          this.loadAllProducts();
        }
      }
    );
  }

  loadAllProducts() {
    this.allProductsService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      },
    });
  }
  filterProductsByTag(tagQuery: TagQuery) {
    this.allProductsService.getProductsByTag(tagQuery).subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading filtered products:', error);
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.allProductsSubscription.unsubscribe();
    this.queryParamsSubscription.unsubscribe();
  }
}
