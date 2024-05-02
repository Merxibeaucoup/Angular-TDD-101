import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[resizableColumn]',
  standalone: true,
})
export class ResizableColumnDirective {
  startX!: number;
  startWidth!: number;
  resizing: boolean = false;
  resizeThreshold: number = 10; // Adjust this value as needed

  constructor(private el: ElementRef) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const offsetFromRight = this.el.nativeElement.offsetWidth - event.offsetX;

    // Allow resizing only if the mouse pointer is within the resizeThreshold pixels from the right border
    if (offsetFromRight < this.resizeThreshold) {
      this.resizing = true;
      this.startX = event.pageX;
      this.startWidth = this.el.nativeElement.offsetWidth;

      document.addEventListener('mousemove', this.onMouseMove.bind(this));
      document.addEventListener('mouseup', this.onMouseUp.bind(this));
    }
  }

  onMouseMove(event: MouseEvent) {
    if (this.resizing) {
      const width = this.startWidth + (event.pageX - this.startX);
      this.el.nativeElement.style.width = width + 'px';
    }
  }

  onMouseUp() {
    this.resizing = false;
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('mouseup', this.onMouseUp.bind(this));
  }
}
