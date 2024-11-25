import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  finalize,
  from,
  map,
  of,
} from 'rxjs';
import { CategoriesService } from '../categories/categories.service';
import { Product, ProductGroup } from './products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private mockAPI = 'assets/data/products/allData.json';
  private categoriesService = inject(CategoriesService);
  private filteredProducts = new BehaviorSubject<ProductGroup[]>([]);
  private allProducts: Product[] = [];
  private hasMoreProducts = true;
  private isLoading = false;
  private offset = 0;
  private limit = 7;
  filteredProducts$: Observable<ProductGroup[]> =
    this.filteredProducts.asObservable();

  private getAllProducts(pagination: {
    offset: number;
    limit: number;
  }): Observable<Product[]> {
    return from(
      fetch(this.mockAPI)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch products');
          }
          return res.json();
        })
        .then(
          (data) =>
            data.slice(
              pagination.offset,
              pagination.offset + pagination.limit
            ) as Product[]
        )
    ).pipe(
      catchError((error) => {
        console.error('Error fetching products:', error);
        throw error;
      })
    );
  }
  private groupByCategory(products: Product[]): Observable<ProductGroup[]> {
    return this.categoriesService.getAllCategories().pipe(
      map((categories) => {
        const grouped = products.reduce((acc, product) => {
          if (!acc[product.category]) {
            acc[product.category] = [];
          }
          acc[product.category].push(product);
          return acc;
        }, {} as Record<string, Product[]>);

        return Object.keys(grouped).map((category) => {
          const categoryData = categories.find(
            (cat) => cat.anchor === category
          );
          return {
            category,
            name: categoryData?.name || 'Unknown category',
            products: grouped[category],
          };
        });
      })
    );
  }
  loadProducts(
    pagination: { offset?: number; limit?: number } = {}
  ): Observable<void> {
    const { offset = this.offset, limit = this.limit } = pagination;

    if (this.isLoading || !this.hasMoreProducts) return new Observable();

    this.isLoading = true;

    return this.getAllProducts({ offset, limit }).pipe(
      map((products) => {
        if (products.length < limit) {
          this.hasMoreProducts = false; // Останавливаем загрузку, если данных больше нет
        }
        this.allProducts = [...this.allProducts, ...products];
        this.offset += limit;
        this.applyFilters(); // Применяем фильтры после загрузки
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      }),
      finalize(() => {
        this.isLoading = false;
      })
    );
  }
  applyFilters(
    filters: {
      id?: number;
      tag?: string;
      isNew?: boolean;
      searchTerm?: string;
      recommendationsCount?: number;
    } = {}
  ): void {
    const { id, tag, isNew, searchTerm, recommendationsCount } = filters;

    let filteredProducts = [...this.allProducts];

    if (id !== undefined) {
      const product = filteredProducts.find((p) => p.id === filters.id);
      filteredProducts = product ? [product] : [];
    }

    if (tag) {
      filteredProducts = filteredProducts.filter((product) =>
        product.tags?.includes(tag)
      );
    }

    if (isNew) {
      filteredProducts = filteredProducts.filter(
        (product) => product.new === true
      );
    }

    if (searchTerm) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm?.toLowerCase() || '')
      );
    }

    if (recommendationsCount !== undefined) {
      filteredProducts = filteredProducts
        .sort(() => 0.5 - Math.random())
        .slice(0, recommendationsCount);
    }

    this.groupByCategory(filteredProducts).subscribe((groupedProducts) => {
      this.filteredProducts.next(groupedProducts);
    });
  }
  reset(): void {
    this.allProducts = [];
    this.offset = 0;
    this.hasMoreProducts = true;
    this.filteredProducts.next([]);
  }
  getProductById(productId: number): Observable<Product | null> {
    const product = this.allProducts.find((p) => p.id === productId);

    if (product) {
      return of(product);
    }

    return this.loadProducts().pipe(
      map(() => this.allProducts.find((p) => p.id === productId) || null)
    );
  }
  getRecommendations(count: number): Observable<Product[]> {
    if (this.allProducts.length >= count) {
      return of(
        this.allProducts.sort(() => 0.5 - Math.random()).slice(0, count)
      );
    }

    return this.loadProducts().pipe(
      map(() =>
        this.allProducts.sort(() => 0.5 - Math.random()).slice(0, count)
      )
    );
  }
  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) {
      return of([]);
    }

    const filteredProducts = this.allProducts.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );

    if (filteredProducts.length > 0) {
      return of(filteredProducts);
    }

    return this.loadProducts().pipe(
      map(() =>
        this.allProducts.filter((product) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  }
}
