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
  sortColumn: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Поля для нового барбера
  newBarberName: string = '';
  newBarberExperience: number | null = null;

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
        this.sortBarbers();
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
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortBarbers();
  }

  onAddBarberClick() {
    if (!this.token) {
      this.errorMessage = 'Сначала авторизуйтесь, чтобы добавить барбера.';
      return;
    }

    if (!this.newBarberName || this.newBarberExperience === null) {
      this.errorMessage = 'Заполните имя и опыт барбера перед добавлением.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const barberData = {
      name: this.newBarberName,
      experienceLevel: this.newBarberExperience
    };

    this.barberService.addBarber(this.token, barberData).subscribe({
      next: (addedBarber) => {
        this.isLoading = false;
        this.successMessage = 'Барбер успешно добавлен!';
        // Добавим нового барбера в список и отсортируем
        this.barbers.push(addedBarber);
        this.sortBarbers();
        // Очистим поля формы
        this.newBarberName = '';
        this.newBarberExperience = null;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Ошибка при добавлении барбера';
        console.error(err);
      }
    });
  }

  onDeleteBarberClick(barberId: number) {
    if (!this.token) {
      this.errorMessage = 'Сначала авторизуйтесь, чтобы удалять барберов.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.barberService.deleteBarber(this.token, barberId).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Барбер успешно удалён!';
        // Удалим барбера из списка
        this.barbers = this.barbers.filter(b => b.id !== barberId);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Ошибка при удалении барбера';
        console.error(err);
      }
    });
  }
}