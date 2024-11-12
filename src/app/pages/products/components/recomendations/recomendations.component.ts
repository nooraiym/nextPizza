import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../../shared/services/all-products/all-products.model';
import { ProductCardComponent } from '../../../home/components/product-card/product-card.component';
import { ProductCardType } from '../../../home/components/product-card/product-card.model';

@Component({
  selector: 'recomendations',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './recomendations.component.html',
  styleUrl: './recomendations.component.scss',
})
export class RecomendationsComponent implements OnInit {
  ProductCardType = ProductCardType;
  private route = inject(ActivatedRoute);
  recomendations!: Product[];

  ngOnInit(): void {
    this.recomendations = this.route.snapshot.data['recomendations'];
  }
}
