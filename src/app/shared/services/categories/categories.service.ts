import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { Category } from './categories.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private mockAPI = 'assets/data/categories.json';

  getAllCategories(): Observable<Category[]> {
    return from(
      fetch(this.mockAPI)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch categories');
          }
          return res.json();
        })
        .then((data) => data as Category[])
    ).pipe((data) => data);
  }
}
