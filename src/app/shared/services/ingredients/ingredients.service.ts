import { Injectable } from '@angular/core';
import { Observable, catchError, from, map } from 'rxjs';
import { Ingredient } from './ingredients.model';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  private apiUrl = 'assets/data/ingredients.json';

  getAllIngredients(): Observable<Ingredient[]> {
    return from(
      fetch(this.apiUrl)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch products');
          }
          return res.json();
        })
        .then((data) => data as Ingredient[])
    ).pipe(
      map((data) => data),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
