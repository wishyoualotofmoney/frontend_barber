import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppointmentService } from '../services/appointment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [FormsModule, CommonModule]
})
export class DashboardComponent {
  showForm = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  
  // Данные для формы
  appointmentTime: string = '';
  barberName: string = '';
  serviceName: string = '';

  constructor(private authService: AuthService, private appointmentService: AppointmentService) {}

  onScheduleClick() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    console.log('Кнопка нажата, логин...');

    // Логинимся (admin:admin)
    this.authService.login('admin', 'admin').subscribe({
      next: (res) => {
        this.isLoading = false;
        // Если успешно залогинились – показываем форму
        this.showForm = true;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Ошибка при авторизации';
        console.error(err);
      }
    });
  }

  onCreateAppointment() {
    const token = this.authService.getToken();
    if (!token) {
      this.errorMessage = 'Нет токена авторизации!';
      return;
    }

    // Пример данных для записи:
    const appointmentData = {
      appointmentTime: this.appointmentTime, 
      barber: {
        id: 1,
        name: this.barberName,
        experienceLevel: 3
      },
      customer: {
        id: 999,
        name: "Ваше имя", 
        preferredStyle: "Модерн"
      },
      service: {
        id: 5,
        name: this.serviceName,
        price: 1000,
        duration: 60
      }
    };

    this.isLoading = true;
    this.appointmentService.createAppointment(token, appointmentData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = 'Запись успешно создана!';
        // Можно очистить форму или скрыть её
        this.showForm = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Ошибка при создании записи';
        console.error(err);
      }
    });
  }
}
