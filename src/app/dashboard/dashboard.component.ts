import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
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

  constructor(private authService: AuthService) {}

  onLoginClick() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    console.log('Кнопка нажата, логин...');

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
}