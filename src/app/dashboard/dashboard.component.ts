import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BarberService } from '../services/barber.service'; // Импортируем наш сервис для барберов
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
  barbers: any[] = []; // Массив для хранения списка барберов

  constructor(private authService: AuthService, private barberService: BarberService) {}

  onLoginClick() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.login('admin', 'admin').subscribe({
      next: (res) => {
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
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Ошибка при получении списка барберов';
        console.error(err);
      }
    });
  }
}