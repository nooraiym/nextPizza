import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChevronUp, LucideAngularModule } from 'lucide-angular';
import { Tag } from '../../../../../shared/services/tags/tags.model';

@Component({
  selector: 'dropdown-tags',
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './dropdown-tags.component.html',
  styleUrl: './dropdown-tags.component.scss',
})
export class DropdownTagsComponent {
  readonly ChevronUp = ChevronUp;
  @Input({ required: true }) tags!: Tag[];
}
