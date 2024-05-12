import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[resizableSection]',
  standalone: true,
})
export class ResizableSectionDirective {
  @Input('topResize') topElement!: HTMLElement;
  @Input('bottomResize') bottomElement!: HTMLElement;
  grabber: boolean = false;
  height: number | undefined;

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.height = (event.target as Window).outerHeight;
  }

  @HostListener('mousedown')
  onMouseDown() {
    this.grabber = true;
    // this.el.nativeElement.classList.add('side-panel');
    document.body.style.cursor = 'row-resize';
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    this.grabber = false;
    // this.el.nativeElement.classList.remove('side-panel');
    document.body.style.cursor = 'default';
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.grabber) {
      event.preventDefault();
      if (event.movementY > 0) {
        this.bottomElement.style.flex = `0 5 ${
          (this.height || window.screen.availHeight) - event.clientY + 100
        }px`;
        this.topElement.style.flex = `1 5 ${event.clientY - 16}px`;
      } else {
        this.topElement.style.flex = `0 5 ${event.clientY - 16}px`;
        this.bottomElement.style.flex = `1 5 ${
          (this.height || window.screen.availHeight) - event.clientY + 100
        }px`;
      }
    }
  }
}
