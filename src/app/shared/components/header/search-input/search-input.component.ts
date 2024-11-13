import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule, Search } from 'lucide-angular';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
} from 'rxjs';
import { Product } from '../../../services/all-products/all-products.model';
import { AllProductsService } from '../../../services/all-products/all-products.service';

@Component({
  selector: 'search-input',
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  readonly Search = Search;
  private router = inject(Router);
  private allProductsService = inject(AllProductsService);
  private searchTerms = new Subject<string>();
  searchResults$: Observable<Product[]> = of([]);
  focused = false;

  constructor() {
    this.searchResults$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.searchProducts(term))
    );
  }

  handleInputFocus() {
    this.focused = true;
  }
  handleSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const term = input.value;
    this.searchTerms.next(term);
  }
  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.allProductsService.getProductsBySearchTerms(term);
  }
  openProductPage(productId: number): void {
    this.router.navigate([`/products/${productId}`]);
    this.focused = false;
  }
}
