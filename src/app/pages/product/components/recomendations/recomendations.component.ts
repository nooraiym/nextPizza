import { Component, Input } from '@angular/core';
import { Product } from '../../../../shared/services/products/products.model';
import { ProductCardComponent } from '../../../home/components/product-card/product-card.component';

@Component({
  selector: 'recomendations',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './recomendations.component.html',
  styleUrl: './recomendations.component.scss',
})
export class RecomendationsComponent {
  @Input({ required: true }) recomendations!: Product[];
}
