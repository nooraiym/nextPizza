import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { SidemenuComponent } from '../../shared/components/sidemenu/sidemenu.component';
import { Category } from '../../shared/services/categories/categories.model';
import { CategoriesService } from '../../shared/services/categories/categories.service';
import {
  Product,
  ProductGroup,
} from '../../shared/services/products/products.model';
import { ProductsService } from '../../shared/services/products/products.service';
import { CategoryMenuComponent } from './components/category-menu/category-menu.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
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
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private categoriesService = inject(CategoriesService);
  private allProductsSubscription!: Subscription;
  private queryParamsSubscription!: Subscription;
  private categoriesSubscription!: Subscription;
  @ViewChild('nav') navElement!: ElementRef;
  @ViewChild('stickyMenu') stickyMenu!: ElementRef;
  @ViewChildren('categorySection') categorySections!: QueryList<ElementRef>;
  products: Product[] = [];
  productsByCategory: ProductGroup[] = [];
  categories: Category[] = [];
  tag: string = 'all';
  isNewOnly!: boolean;
  isSticky = false;
  navOffsetTop = 0;
  activeCategory: string = 'pizzas';

  ngOnInit() {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.activeCategory = fragment;
        this.scrollToCategory(fragment);
      }
    });
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        this.tag = params['tag'];
        this.isNewOnly = params['isNewOnly'] === 'true';
        this.fetchAProducts();
      }
    );
    this.categoriesSubscription = this.categoriesService
      .getAllCategories()
      .subscribe((data) => {
        this.categories = data;
      });
  }

  ngAfterViewInit() {
    if (this.navElement) {
      this.navOffsetTop =
        this.navElement.nativeElement.getBoundingClientRect().bottom;
    }
  }

  @HostListener('window:scroll', [])
  handleWindowScroll() {
    this.isSticky = window.scrollY > this.navOffsetTop;
  }
  handlescrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  scrollToCategory(anchor: string): void {
    const element = this.categorySections?.find(
      (section) => section.nativeElement.getAttribute('data-anchor') === anchor
    );
    if (element) {
      element.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
      this.router.navigate([], { fragment: anchor });
    }
  }
  fetchAProducts() {
    this.allProductsSubscription = this.productsService
      .getProducts({ tag: this.tag, isNew: this.isNewOnly })
      .subscribe((data) => (this.productsByCategory = data));
  }

  ngOnDestroy(): void {
    if (this.allProductsSubscription) {
      this.allProductsSubscription.unsubscribe();
    }
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}
