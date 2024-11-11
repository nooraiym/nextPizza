import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { _ingredients } from '../../../../../mock/ingredients';

@Component({
  selector: 'product-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product = {
    name: 'Жюльен',
    imageUrl:
      'https://media.dodostatic.net/image/r:584x584/11EE7D5FD6097096B601585D57F44A6F.avif',
    ingredients:
      'Цыпленок, шампиньоны, соус сливочный с грибами, красный лук, чеснок, моцарелла, смесь сыров чеддер и пармезан, фирменный соус альфредо',
    baseWeight: 430,
    cost: 799,
  };
  options = _ingredients;
  orderForm: FormGroup;
  basePrice = this.product.cost;
  totalPrice = this.basePrice;

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      size: ['30'],
      crust: ['traditional'],
    });
  }

  updatePrice() {
    const selectedOptions = this.options.filter((opt) => opt.selected);
    const additionalPrice = selectedOptions.reduce(
      (sum, opt) => sum + opt.price,
      0
    );
    this.totalPrice = this.basePrice + additionalPrice;
  }
  handleToggleOption(option: any) {
    option.selected = !option.selected;
    this.updatePrice();
  }
  handleSubmit(e: Event) {
    e.preventDefault();
    console.log('Выбранный размер:', this.orderForm.value.size);
    console.log('Выбранная корочка:', this.orderForm.value.crust);
  }
}
