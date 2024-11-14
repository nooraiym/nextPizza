import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RecomendationsComponent } from './components/recomendations/recomendations.component';

@Component({
  selector: 'product',
  standalone: true,
  imports: [
    HeaderComponent,
    ProductDetailsComponent,
    RecomendationsComponent,
    FooterComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {}
