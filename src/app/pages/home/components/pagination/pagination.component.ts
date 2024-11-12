import { Component } from '@angular/core';
import { ChevronLeft, ChevronRight, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'pagination',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;
}
