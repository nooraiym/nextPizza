import { Component, Input } from '@angular/core';
import { PopoverComponent } from "../../ui/popover/popover.component";

@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [PopoverComponent],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.scss',
})
export class SelectionComponent {
  @Input({ required: true }) mode!: 'filter' | 'sort';
}
