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
import { Product } from '../../shared/services/products/products.model';
import { ProductsService } from '../../shared/services/products/products.service';
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
  private productsService = inject(ProductsService);
  private allProductsSubscription!: Subscription;
  private queryParamsSubscription!: Subscription;
  @ViewChild('nav') navElement!: ElementRef;
  products: Product[] = [];
  tag: string = 'all';
  isNewOnly!: boolean;
  isSticky = false;
  navOffsetTop = 0;

  ngOnInit() {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        this.tag = params['tag'];
        this.isNewOnly = params['isNewOnly'] === 'true';
        this.fetchAProducts();
      }
    );
  }

  ngAfterViewInit() {
    this.navOffsetTop =
      this.navElement.nativeElement.getBoundingClientRect().bottom;
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
  fetchAProducts() {
    this.allProductsSubscription = this.productsService
      .getProducts({ tag: this.tag, isNew: this.isNewOnly })
      .subscribe((data) => (this.products = data));
  }

  ngOnDestroy(): void {
    this.allProductsSubscription.unsubscribe();
    this.queryParamsSubscription.unsubscribe();
  }
}
