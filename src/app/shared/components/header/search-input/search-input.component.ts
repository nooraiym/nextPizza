import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'search-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  focused = false;

  onInputFocus() {
    this.focused = true;
  }
}
