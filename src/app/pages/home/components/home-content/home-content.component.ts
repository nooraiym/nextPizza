import { Component, OnInit } from '@angular/core';
import { products } from '../../../../../mock/products';
import { PaginationComponent } from '../pagination/pagination.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'home-content',
  standalone: true,
  imports: [SkeletonComponent, ProductCardComponent, PaginationComponent],
  templateUrl: './home-content.component.html',
  styleUrl: './home-content.component.scss',
})
export class HomeContentComponent implements OnInit {
  products = products;
  isLoading = true;

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
