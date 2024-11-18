import { Injectable, inject } from '@angular/core';
import { Observable, catchError, from, map, switchMap } from 'rxjs';
import { CategoriesService } from '../categories/categories.service';
import { Product, ProductGroup } from './products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private categoriesService = inject(CategoriesService);
  private mockAPI = 'assets/data/products/allData.json';

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
      map((data) => data),
      catchError((error) => {
        console.error(error);
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

  getProducts(
    filters: {
      id?: number;
      tag?: string;
      isNew?: boolean;
      searchTerm?: string;
      recommendationsCount?: number;
    },
    pagination: { offset?: number; limit?: number }
  ): Observable<ProductGroup[]> {
    const { offset = 0, limit = 7 } = pagination;
    const { id, tag, isNew, searchTerm, recommendationsCount } = filters;
    return this.getAllProducts({ offset, limit }).pipe(
      map((products) => {
        let filteredProducts = [...products];

        if (id !== undefined) {
          const product = filteredProducts.find((p) => p.id === filters.id);
          if (!product) {
            throw new Error(`Product with id ${filters.id} not found`);
          }
          return [product];
        }

        if (tag) {
          filteredProducts = filteredProducts.filter((product) =>
            product.tags?.some((t) => t === filters.tag)
          );
        }

        if (isNew) {
          filteredProducts = filteredProducts.filter((product) => product.new);
        }

        if (searchTerm) {
          filteredProducts = filteredProducts.filter((product) =>
            product.name
              .toLowerCase()
              .includes(filters.searchTerm?.toLowerCase() || '')
          );
        }

        if (recommendationsCount !== undefined) {
          filteredProducts = filteredProducts
            .sort(() => 0.5 - Math.random())
            .slice(0, filters.recommendationsCount);
        }

        return filteredProducts;
      }),
      switchMap((filteredProducts) => this.groupByCategory(filteredProducts)),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
