import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  closeDialog() {
    this.onClose.emit();
  }
}
