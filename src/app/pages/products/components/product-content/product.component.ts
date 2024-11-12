import { Component } from '@angular/core';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { RecomendationsComponent } from '../recomendations/recomendations.component';

@Component({
  selector: 'product',
  standalone: true,
  imports: [ProductDetailsComponent, RecomendationsComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {}
