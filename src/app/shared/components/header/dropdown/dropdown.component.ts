import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'dropdown',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {}
