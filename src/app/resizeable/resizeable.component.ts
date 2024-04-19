import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResizableModule, ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-resizeable',
  standalone: true,
  imports: [CommonModule, FormsModule, ResizableModule],
  templateUrl: './resizeable.component.html',
  styleUrl: './resizeable.component.scss',
})
export class ResizeableComponent {
  public style1: object = {};
  public style2: object = {};
  public wrapperHeight: number = 0;

  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 100;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }

  onResizeEnd(event: ResizeEvent, rectangle: number): void {
    const totalHeight = this.wrapperHeight;

    if (event.rectangle) {
      const { height } = event.rectangle;

      if (height) {
        // Adjust heights based on the resize event
        if (rectangle === 1) {
          const newTopHeight = Math.max(height, totalHeight * 0.2); // Minimum height as a percentage of total height
          const newBottomHeight = totalHeight - newTopHeight;

          this.style1 = {
            position: 'fixed',
            left: `${event.rectangle.left}px`,
            top: `${event.rectangle.top}px`,
            width: `${event.rectangle.width}px`,
            height: `max(${newTopHeight}px, 1px)`, // Ensure a minimum height of 1px
          };

          this.style2 = {
            position: 'fixed',
            left: `${event.rectangle.left}px`,
            top: `${event.rectangle.top + newTopHeight}px`,
            width: `${event.rectangle.width}px`,
            height: `max(${newBottomHeight}px, 1px)`, // Ensure a minimum height of 1px
          };
        } else if (rectangle === 2) {
          const newBottomHeight = Math.max(height, totalHeight * 0.2); // Minimum height as a percentage of total height
          const newTopHeight = totalHeight - newBottomHeight;

          this.style2 = {
            position: 'fixed',
            left: `${event.rectangle.left}px`,
            top: `${event.rectangle.top}px`,
            width: `${event.rectangle.width}px`,
            height: `max(${newBottomHeight}px, 1px)`, // Ensure a minimum height of 1px
          };

          this.style1 = {
            position: 'fixed',
            left: `${event.rectangle.left}px`,
            top: `${event.rectangle.top - newTopHeight}px`,
            width: `${event.rectangle.width}px`,
            height: `max(${newTopHeight}px, 1px)`, // Ensure a minimum height of 1px
          };
        }
      }
    }
  }
}
