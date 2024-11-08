import { Component } from '@angular/core';
import { ArrowDownUp, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'sort',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.scss',
})
export class SortComponent {
  readonly ArrowDownUp = ArrowDownUp;
}
