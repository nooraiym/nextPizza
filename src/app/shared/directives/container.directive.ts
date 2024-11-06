import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[container]',
  standalone: true,
})
export class ContainerDirective implements OnInit {
  @Input() class?: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const defaultClasses = [
      'container',
      'min-h-screen',
      'bg-white',
      'mx-auto',
      'max-w-[1280px]',
      'mt-5',
      'px-4',
      'sm:px-6',
      'lg:px-8',
    ];

    // Добавляем классы из директивы
    defaultClasses.forEach((className) => {
      this.renderer.addClass(this.el.nativeElement, className);
    });

    // Если есть дополнительные классы, переданные через атрибут class, добавляем их
    if (this.class) {
      this.class.split(' ').forEach((className) => {
        this.renderer.addClass(this.el.nativeElement, className);
      });
    }
  }
}
