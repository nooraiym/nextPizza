import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Ingredient } from '../../shared/services/ingredients/ingredients.model';
import { Product } from '../../shared/services/products/products.model';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RecomendationsComponent } from './components/recomendations/recomendations.component';

@Component({
  selector: 'product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HeaderComponent,
    ProductDetailsComponent,
    RecomendationsComponent,
    FooterComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  private route = inject(ActivatedRoute);
  orderForm: FormGroup;
  product!: Product;
  ingredients!: Ingredient[];
  recomendations!: Product[];
  basePrice!: number;
  totalPrice!: number;

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      size: ['30'],
      crust: ['traditional'],
    });
  }

  ngOnInit(): void {
    this.ingredients = this.route.snapshot.data['ingredients'];
    this.product = this.route.snapshot.data['product'];
    this.recomendations = this.route.snapshot.data['recomendations'];
    this.basePrice = this.product.price;
    this.totalPrice = this.basePrice;
  }

  updatePrice() {
    const selectedOptions = this.ingredients.filter((opt) => opt.selected);
    const additionalPrice = selectedOptions.reduce(
      (sum, opt) => sum + opt.price,
      0
    );
    this.totalPrice = this.basePrice + additionalPrice;
  }
  submitForm() {
    console.log('Выбранный размер:', this.orderForm.value.size);
    console.log('Выбранная корочка:', this.orderForm.value.crust);
  }
}
