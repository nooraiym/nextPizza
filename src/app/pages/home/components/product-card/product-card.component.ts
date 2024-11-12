import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { Product } from '../../../../shared/services/all-products/all-products.model';
import { ProductCardType } from './product-card.model';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  readonly Plus = Plus;
  @Input({ required: true }) product!: Product;
  @Input({ required: true }) cardType!: ProductCardType;
  ProductCardType = ProductCardType;

  isMainType(): boolean {
    return this.cardType === ProductCardType.Main;
  }
  isDetailedType(): boolean {
    return this.cardType === ProductCardType.Detailed;
  }
}
