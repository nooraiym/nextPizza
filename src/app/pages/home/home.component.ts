import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import {
  Product,
  TagQuery,
} from '../../shared/services/all-products/all-products.model';
import { AllProductsService } from '../../shared/services/all-products/all-products.service';
import { handleError } from '../../shared/utils/error-handler.util';
import { CategoryMenuComponent } from './components/category-menu/category-menu.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductCardType } from './components/product-card/product-card.model';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { SortComponent } from './components/sort/sort.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    CommonModule,
    SidemenuComponent,
    NavigationComponent,
    SortComponent,
    HeaderComponent,
    SkeletonComponent,
    ProductCardComponent,
    PaginationComponent,
    FooterComponent,
    CategoryMenuComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  ProductCardType = ProductCardType;
  private route = inject(ActivatedRoute);
  private allProductsService = inject(AllProductsService);
  private allProductsSubscription!: Subscription;
  private queryParamsSubscription!: Subscription;
  @ViewChild('nav') navElement!: ElementRef;
  products: Product[] = [];
  isSticky = false;
  navOffsetTop = 0;

  ngOnInit() {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        const tag = params['tag'];
        const isNewOnly = params['isNewOnly'] === 'true';

        if (tag) {
          tag === 'all'
            ? this.loadAllProducts()
            : this.filterProductsByTag(tag);
        } else {
          this.loadAllProducts();
        }

        if (isNewOnly) {
          this.filterProductsByNewest();
        }
      }
    );
  }

  ngAfterViewInit() {
    this.navOffsetTop =
      this.navElement.nativeElement.getBoundingClientRect().bottom;
  }

  @HostListener('window:scroll', [])
  handleWindowScroll() {
    this.isSticky = window.pageYOffset > this.navOffsetTop;
  }
  handlescrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  loadAllProducts() {
    this.allProductsSubscription = this.allProductsService
      .getAllProducts()
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) => handleError('Error loading products:', error),
      });
  }
  filterProductsByTag(tagQuery: TagQuery) {
    this.allProductsSubscription = this.allProductsService
      .getProductsByTag(tagQuery)
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) =>
          handleError('Error loading filtered products:', error),
      });
  }
  filterProductsByNewest() {
    this.allProductsSubscription = this.allProductsService
      .getProductsByNewest()
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) => handleError('Error loading newest products:', error),
      });
  }

  ngOnDestroy(): void {
    this.allProductsSubscription.unsubscribe();
    this.queryParamsSubscription.unsubscribe();
  }
}
