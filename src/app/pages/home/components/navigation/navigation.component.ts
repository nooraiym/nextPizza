import { Component } from '@angular/core';
import { ChevronDown, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'navigation',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  readonly ChevronDown = ChevronDown;
}
