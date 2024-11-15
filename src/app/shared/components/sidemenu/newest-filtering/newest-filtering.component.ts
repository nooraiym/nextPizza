import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'newest-filtering',
  standalone: true,
  imports: [],
  templateUrl: './newest-filtering.component.html',
  styleUrl: './newest-filtering.component.scss',
})
export class NewestFilteringComponent {
  @Input({ required: true }) isNewOnly: boolean = false;
  @Output() onToggleNewFilter = new EventEmitter();

  handleToggleNewFilter(event: Event): void {
    this.onToggleNewFilter.emit(event);
  }
}
