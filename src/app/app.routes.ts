import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ResizeableComponent } from './resizeable/resizeable.component';
import { DropDownDatesComponent } from './drop-down-dates/drop-down-dates.component';
import { HomepageComponent } from './homepage/homepage.component';

const appTitle: string = 'App 2.0';
export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'drop-down-dates',
    component: DropDownDatesComponent,
  },
];
