import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'search-input',
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  readonly Search = Search;
  focused = false;

  onInputFocus() {
    this.focused = true;
  }
}
