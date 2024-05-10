import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[resizableSection]',
  standalone: true,
})
export class ResizableSectionDirective {
  private startY: number = 0;
  private startHeight: number = 0;

  constructor(private el: ElementRef) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.startY = event.clientY;
    this.startHeight = this.el.nativeElement.offsetHeight;
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (event: MouseEvent) => {
    const deltaY = event.clientY - this.startY;
    this.el.nativeElement.style.height = `${this.startHeight + deltaY}px`;
  };

  onMouseUp = () => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  };
}
