import { Injectable } from '@angular/core';
import { Observable, catchError, from, map } from 'rxjs';
import { Tag } from './tags.model';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private apiUrl = 'assets/data/tags.json';

  getAllTags(): Observable<Tag[]> {
    return from(
      fetch(this.apiUrl)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch products');
          }
          return res.json();
        })
        .then((data) => data as Tag[])
    ).pipe(
      map((data) => data),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
}
