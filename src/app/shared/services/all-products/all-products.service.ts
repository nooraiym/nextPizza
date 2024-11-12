import { Injectable } from '@angular/core';
import { Observable, catchError, from, map } from 'rxjs';
import { Product } from './all-products.model';

@Injectable({
  providedIn: 'root',
})
export class AllProductsService {
  private apiUrl = 'assets/data/products/allData.json';

  getAllProducts(): Observable<Product[]> {
    return from(
      fetch(this.apiUrl)
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

  getProductById(id: number): Observable<Product> {
    return this.getAllProducts().pipe(
      map((products) => {
        const product = products.find((p) => p.id === id);
        if (!product) {
          throw new Error(`Product with id ${id} not found`);
        }
        return product;
      })
    );
  }

  getRandomRecommendations(count: number): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map((products) => {
        const shuffled = products.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      })
    );
  }
}
