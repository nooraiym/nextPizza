import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../../../mock/products';
import { LucideAngularModule, Plus } from 'lucide-angular';

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
  @Input({ required: true }) mode!: 'main' | 'product-details';
}
