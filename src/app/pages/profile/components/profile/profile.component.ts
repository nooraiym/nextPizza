import { Component } from '@angular/core';
import { SpecialDiscountsComponent } from '../special-discounts/special-discounts.component';
import { PersonalInfoComponent } from "../personal-info/personal-info.component";
import { OptionalInfoComponent } from "../optional-info/optional-info.component";

@Component({
  selector: 'profile',
  standalone: true,
  imports: [SpecialDiscountsComponent, PersonalInfoComponent, OptionalInfoComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {}
