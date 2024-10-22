import { Component, Input } from '@angular/core';

type Size = 'default' | 'sm' | 'lg' | 'icon';
type Variant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() variant: Variant = 'default';
  @Input() size: Size = 'default';
  @Input() disabled = false;
  @Input() loading = false;

  get buttonClasses() {
    const baseClasses =
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 disabled:pointer-events-none disabled:opacity-50';

    const variantClasses = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive:
        'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline:
        'border border-primary text-primary bg-transparent hover:bg-secondary',
      secondary: 'bg-secondary text-primary hover:bg-secondary/50',
      ghost: 'hover:bg-secondary hover:text-secondary-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    };

    const sizeClasses = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10', // TODO
    };

    return `${baseClasses} ${variantClasses[this.variant]} ${
      sizeClasses[this.size]
    }`;
  }
}
