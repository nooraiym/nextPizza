import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
})
export class TitleComponent {
  @Input({ required: true }) text: string = '';
  @Input() size: TitleSize = 'sm';
  @Input() class?: string;

  get tag() {
    const mapTagBySize: Record<TitleSize, string> = {
      xs: 'h5',
      sm: 'h4',
      md: 'h3',
      lg: 'h2',
      xl: 'h1',
      '2xl': 'h1',
    };
    return mapTagBySize[this.size];
  }

  get sizeClass() {
    const mapClassNameBySize: Record<TitleSize, string> = {
      xs: 'text-[16px] ys-text',
      sm: 'text-[22px] ys-text',
      md: 'text-[26px] ys-text',
      lg: 'text-[32px] ys-display',
      xl: 'text-[40px] ys-display',
      '2xl': 'text-[48px] ys-display',
    };
    return mapClassNameBySize[this.size];
  }
}
