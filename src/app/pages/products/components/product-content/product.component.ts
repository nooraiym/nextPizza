import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { RecomendationsComponent } from '../recomendations/recomendations.component';

@Component({
  selector: 'product',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    ProductDetailsComponent,
    RecomendationsComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {}
