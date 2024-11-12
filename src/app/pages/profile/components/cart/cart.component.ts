import { Component } from '@angular/core';
import { PersonalInfoComponent } from '../personal-info/personal-info.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CartTotalsComponent } from './cart-totals/cart-totals.component';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [
    PersonalInfoComponent,
    CartTotalsComponent,
    CartDetailsComponent,
    AddressFormComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {}
