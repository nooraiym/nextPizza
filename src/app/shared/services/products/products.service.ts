import { Injectable } from '@angular/core';
import { Observable, catchError, from, map } from 'rxjs';
import { Product } from './products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private mockAPI = 'assets/data/products/allData.json';

  private getAllProducts(): Observable<Product[]> {
    return from(
      fetch(this.mockAPI)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch products');
          }
          return res.json();
        })
        .then((data) => data as Product[])
    ).pipe(
      map((data) => data),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }

  getProducts(filters: {
    id?: number;
    tag?: string;
    isNew?: boolean;
    searchTerm?: string;
    recommendationsCount?: number;
  }): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map((products) => {
        let filteredProducts = [...products];

        if (filters.id !== undefined) {
          const product = filteredProducts.find((p) => p.id === filters.id);
          if (!product) {
            throw new Error(`Product with id ${filters.id} not found`);
          }
          return [product];
        }

        if (filters.tag) {
          filteredProducts = filteredProducts.filter((product) =>
            product.tags?.some((t) => t === filters.tag)
          );
        }

        if (filters.isNew) {
          filteredProducts = filteredProducts.filter((product) => product.new);
        }

        if (filters.searchTerm) {
          filteredProducts = filteredProducts.filter((product) =>
            product.name
              .toLowerCase()
              .includes(filters.searchTerm?.toLowerCase() || '')
          );
        }

        if (filters.recommendationsCount !== undefined) {
          filteredProducts = filteredProducts
            .sort(() => 0.5 - Math.random())
            .slice(0, filters.recommendationsCount);
        }

        return filteredProducts;
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
