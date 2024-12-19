import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component'; 

export const appRoutes: Routes = [
  { path: '', component: MainComponent },   
  { path: '', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '' }
];
