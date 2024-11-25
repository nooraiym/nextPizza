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
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { SidemenuComponent } from '../../shared/components/sidemenu/sidemenu.component';
import { CartService } from '../../shared/services/cart/cart.service';
import { Category } from '../../shared/services/categories/categories.model';
import { CategoriesService } from '../../shared/services/categories/categories.service';
import {
  OrderDescription,
  OrderProduct,
} from '../../shared/services/orders/orders.model';
import {
  Product,
  ProductGroup,
} from '../../shared/services/products/products.model';
import { ProductsService } from '../../shared/services/products/products.service';
import { CategoryMenuComponent } from './components/category-menu/category-menu.component';
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
    FooterComponent,
    CategoryMenuComponent,
    CarouselComponent,
    ProductCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private categoriesService = inject(CategoriesService);
  private cartService = inject(CartService);
  private subscriptions: Subscription[] = [];
  private isLoading = false;
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
  offset = 0;
  limit = 7;

  ngOnInit() {
    const routeSubscription = this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.activeCategory = fragment;
        this.scrollToCategory(fragment);
      }
    });
    const queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        this.tag = params['tag'];
        this.isNewOnly = params['isNewOnly'] === 'true';
        this.fetchProducts();
      }
    );
    const categoriesSubscription = this.categoriesService
      .getAllCategories()
      .subscribe((data) => {
        this.categories = data;
      });
    this.subscriptions.push(
      routeSubscription,
      queryParamsSubscription,
      categoriesSubscription
    );
  }

  ngAfterViewInit() {
    if (this.navElement) {
      this.navOffsetTop =
        this.navElement.nativeElement.getBoundingClientRect().bottom;
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.isLoading) return;
    this.isSticky = window.scrollY > this.navOffsetTop;
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.body.offsetHeight;

    if (scrollPosition >= documentHeight - 200) {
      this.isLoading = true;
      this.fetchProducts();
    }
  }
  handlescrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  scrollToCategory(anchor: string): void {
    //TODO: пофиксить баг с переходом по anchor tags при первой загрузке
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
  fetchProducts() {
    const filters = { tag: this.tag, isNew: this.isNewOnly };
    const currentCategory = this.productsByCategory.find(
      (group) => group.category === this.activeCategory
    );

    if (currentCategory) {
      const productsInCategory = currentCategory.products.length;
      this.limit = Math.max(1, productsInCategory);
    }

    const pagination = { offset: this.offset, limit: this.limit };
    const productsSubscription = this.productsService
      .getProducts(filters, pagination)
      .subscribe({
        next: (data) => {
          if (data.length !== 0) {
            data.forEach((group) => {
              const existingGroup = this.productsByCategory.find(
                (existing) => existing.category === group.category
              );

              if (existingGroup) {
                existingGroup.products = [
                  ...existingGroup.products,
                  ...group.products,
                ];
              } else {
                this.productsByCategory.push(group);
              }
            });

            this.offset += this.limit;
          }
          this.isLoading = false;
        },
      });
    this.subscriptions.push(productsSubscription);
  }
  addProductToCart(product: Product) {
    const orderDescription = {
      size: '30',
      crust: 'traditional',
    } as OrderDescription;

    const orderedProduct: OrderProduct = {
      ...product,
      shortDescription: { ...orderDescription },
      extraOptions: [],
      quantity: 1,
      totalPrice: product.price,
    };
    this.cartService.addToCart(orderedProduct);
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
  }
}
