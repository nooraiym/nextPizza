import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-sheet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sheet.component.html',
  styleUrl: './sheet.component.scss',
})
export class SheetComponent {
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (
      this.isOpen &&
      !(event.target as HTMLElement).closest('.sheet-content')
    ) {
      this.closeSheet();
    }
  }

  closeSheet() {
    this.isOpen = false;
    this.onClose.emit();
  }
}
