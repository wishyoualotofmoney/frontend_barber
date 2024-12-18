import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BarberService } from '../services/barber.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FormsModule]
})
export class DashboardComponent {
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  token: string | null = null;

  barbers: any[] = [];
  sortColumn: string = 'name'; // по умолчанию сортируем по имени
  sortDirection: 'asc' | 'desc' = 'asc'; // направление сортировки

  constructor(private authService: AuthService, private barberService: BarberService) {}

  onLoginClick() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.login('admin', 'admin').subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Авторизация успешна!';
        this.token = this.authService.getToken();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Ошибка при авторизации';
        console.error(err);
      }
    });
  }

  onGetBarbersClick() {
    if (!this.token) {
      this.errorMessage = 'Сначала авторизуйтесь, чтобы получить токен.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.barberService.getAllBarbers(this.token).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.barbers = data;
        this.successMessage = 'Список барберов получен!';
        this.sortBarbers(); // Применим сортировку после получения данных
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Ошибка при получении списка барберов';
        console.error(err);
      }
    });
  }

  sortBarbers() {
    this.barbers.sort((a, b) => {
      const valA = a[this.sortColumn];
      const valB = b[this.sortColumn];

      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  onSort(column: string) {
    if (this.sortColumn === column) {
      // Если кликаем по тому же столбцу, меняем направление сортировки
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Если кликаем по другому столбцу, сортируем по нему в восходящем порядке
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.sortBarbers();
  }
}