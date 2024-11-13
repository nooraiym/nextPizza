import { Injectable } from '@angular/core';
import { Observable, catchError, from, map } from 'rxjs';
import { Category } from './ingredients.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = 'assets/data/categories.json';

  getAllCategories(): Observable<Category[]> {
    return from(
      fetch(this.apiUrl)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch products');
          }
          return res.json();
        })
        .then((data) => data as Category[])
    ).pipe(
      map((data) => data),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
