import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component'; // Добавьте новый компонент

export const appRoutes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent }, // Маршрут для личного кабинета
  { path: '**', redirectTo: '' } // Перенаправление на главную, если маршрут не найден
];
