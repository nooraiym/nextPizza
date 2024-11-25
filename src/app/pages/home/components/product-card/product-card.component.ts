import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { Product } from '../../../../shared/services/products/products.model';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  readonly Plus = Plus;
  private route = inject(ActivatedRoute);
  @Input({ required: true }) product!: Product;
  @Output() onAddProductToCart = new EventEmitter<Product>();
  isDetailedType = false;

  ngOnInit(): void {
    const path = this.route.snapshot.routeConfig?.path;
    this.isDetailedType = path === 'products/:productId';
  }

  handleAddProductToCart(product: Product) {
    this.onAddProductToCart.emit(product);
  }
}
