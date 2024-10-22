import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
})
export class PopoverComponent {
  @Input() isOpen!: boolean;
  @Input() align: 'center' | 'start' | 'end' = 'center';
  @Input() side: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  @Input() sideOffset: number = 4;

  constructor(private elRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
  togglePopover() {
    this.isOpen = !this.isOpen;
  }
}
