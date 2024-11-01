import { Component } from '@angular/core';
import { products } from '../../../../../mock/products';
import { ProductCardComponent } from '../../../home/components/product-card/product-card.component';

@Component({
  selector: 'recomendations',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './recomendations.component.html',
  styleUrl: './recomendations.component.scss',
})
export class RecomendationsComponent {
  recomendations = products.slice(0, 8);
}
