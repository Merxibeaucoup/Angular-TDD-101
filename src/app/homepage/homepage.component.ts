import { Component } from '@angular/core';
import { DropDownDatesComponent } from '../drop-down-dates/drop-down-dates.component';
import { ResizableSectionDirective } from '../directives/resizeSection/resize-section.directive';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [DropDownDatesComponent, ResizableSectionDirective],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  leftWidth = 50;
  rightWidth = 50;
}
