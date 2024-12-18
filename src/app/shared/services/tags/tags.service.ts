import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Tag } from './tags.model';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private mockAPI = 'assets/data/tags.json';

  getAllTags(): Observable<Tag[]> {
    return from(
      fetch(this.mockAPI)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch tags');
          }
          return res.json();
        })
        .then((data) => data as Tag[])
    ).pipe((data) => data);
  }
}
