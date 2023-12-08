import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { AngularComponent } from './angular/angular.component';
import { ReactComponent } from './react/react.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'angular', component: AngularComponent },
  { path: 'react', component: ReactComponent },
  { path: 'about', component: AboutComponent },
];
