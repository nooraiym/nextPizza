import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Ingredient } from './ingredients.model';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  private mockAPI = 'assets/data/ingredients.json';

  getAllIngredients(): Observable<Ingredient[]> {
    return from(
      fetch(this.mockAPI)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch ingredients');
          }
          return res.json();
        })
        .then((data) => data as Ingredient[])
    ).pipe((data) => data);
  }
}
