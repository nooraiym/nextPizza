import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from '../../../services/tags/tags.model';

@Component({
  selector: 'dropdown-tags',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-tags.component.html',
  styleUrl: './dropdown-tags.component.scss',
})
export class DropdownTagsComponent {
  @Input({ required: true }) tags!: Tag[];
  @Input({ required: true }) selectedTag!: Tag;
  @Output() onTagClick = new EventEmitter();

  handleTagClick(tag: Tag) {
    this.onTagClick.emit(tag);
  }
}
