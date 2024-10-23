import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Product = {
  id: number;
  name: string;
  imageUrl: string;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
};

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  @ViewChild('inputRef', { static: true }) inputRef!: ElementRef;
  products: Product[] = [];
  searchQuery = '';
  focused = false;

  onInputFocus() {
    this.focused = true;
  }
}
