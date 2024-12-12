import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
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
import { LucideAngularModule, Menu } from 'lucide-angular';
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
    LucideAngularModule,
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
  readonly Menu = Menu;
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
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
  cartProducts: OrderProduct[] = [];
  tag: string = 'all';
  isNewOnly!: boolean;
  isSticky = false;
  navOffsetTop = 0;
  activeCategory: string = 'pizzas';
  isCartEmpty = true;
  isFiltersOpen = false;

  ngOnInit() {
    const routeSubscription = this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.activeCategory = fragment;
        this.scrollToCategory(fragment);
        this.cdr.detectChanges();
      }
    });
    const productsSubscription =
      this.productsService.filteredProducts$.subscribe((products) => {
        this.productsByCategory = products;
        this.cdr.detectChanges();
      });
    const queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        this.tag = params['tag'];
        this.isNewOnly = params['isNewOnly'] === 'true';
        this.applyFilters();
      }
    );
    const categoriesSubscription = this.categoriesService
      .getAllCategories()
      .subscribe((data) => {
        this.categories = data;
      });
    const cartSubscription = this.cartService.cart$.subscribe((cart) => {
      this.cartProducts = cart.products;
      this.isCartEmpty = cart.products.length === 0;
    });
    this.loadInitialProducts();
    this.subscriptions.push(
      routeSubscription,
      productsSubscription,
      queryParamsSubscription,
      categoriesSubscription,
      cartSubscription
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
      this.productsService.loadProducts().subscribe(() => {
        this.applyFilters();
        this.isLoading = false;
      });
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
  handleToggleFilters() {
    this.isFiltersOpen = !this.isFiltersOpen;
  }
  loadInitialProducts(): void {
    this.productsService.reset();
    this.productsService.loadProducts().subscribe(() => {
      this.applyFilters();
    });
  }
  applyFilters(): void {
    const filters = {
      tag: this.tag,
      isNew: this.isNewOnly,
    };
    this.productsService.applyFilters(filters);
  }
  changeCategory(category: string): void {
    this.activeCategory = category;
    this.loadInitialProducts();
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
  increaseQuantity(product: OrderProduct) {
    this.cartService.increaseQuantity(product.id, []);
  }
  decreaseQuantity(product: OrderProduct) {
    this.cartService.decreaseQuantity(product.id, []);
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
  }
}
