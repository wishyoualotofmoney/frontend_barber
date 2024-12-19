import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BarberService } from '../services/barber.service';
import { CustomerService } from '../services/customer.service';
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
  // Общие поля
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  token: string | null = null;

barberSearchTerm: string = '';
customerSearchTerm: string = '';

  // Барберы
  barbers: any[] = [];
  sortColumnBarbers: string = 'name';
  sortDirectionBarbers: 'asc' | 'desc' = 'asc';
  newBarberName: string = '';
  newBarberExperience: number | null = null;

  // Клиенты
  customers: any[] = [];
  sortColumnCustomers: string = 'name';
  sortDirectionCustomers: 'asc' | 'desc' = 'asc';
  newCustomerName: string = '';
  newCustomerStyle: string = '';

  constructor(
    private authService: AuthService,
    private barberService: BarberService,
    private customerService: CustomerService
  ) {}

  // Авторизация
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

  // ----- Методы для барберов (предполагается, что они уже есть) -----
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
      const valA = a[this.sortColumnBarbers];
      const valB = b[this.sortColumnBarbers];

      if (valA < valB) return this.sortDirectionBarbers === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirectionBarbers === 'asc' ? 1 : -1;
      return 0;
    });
  }

  onSortBarbers(column: string) {
    if (this.sortColumnBarbers === column) {
      this.sortDirectionBarbers = this.sortDirectionBarbers === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumnBarbers = column;
      this.sortDirectionBarbers = 'asc';
    }
    this.sortBarbers();
  }

  onAddBarberClick() {
    if (!this.token) {
      this.errorMessage = 'Сначала авторизуйтесь, чтобы добавить барбера.';
      return;
    }

    if (!this.newBarberName || this.newBarberExperience === null) {
      this.errorMessage = 'Заполните имя и опыт барбера.';
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
        this.barbers.push(addedBarber);
        this.sortBarbers();
        // Сбросим поля формы
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
        this.barbers = this.barbers.filter(b => b.id !== barberId);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Ошибка при удалении барбера';
        console.error(err);
      }
    });
  }

  // ----- Методы для клиентов -----

  onGetCustomersClick() {
    if (!this.token) {
      this.errorMessage = 'Сначала авторизуйтесь, чтобы получить токен.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.customerService.getAllCustomers(this.token).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.customers = data;
        this.successMessage = 'Список клиентов получен!';
        this.sortCustomers();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Ошибка при получении списка клиентов';
        console.error(err);
      }
    });
  }

  sortCustomers() {
    this.customers.sort((a, b) => {
      const valA = a[this.sortColumnCustomers];
      const valB = b[this.sortColumnCustomers];

      if (valA < valB) return this.sortDirectionCustomers === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirectionCustomers === 'asc' ? 1 : -1;
      return 0;
    });
  }

  onSortCustomers(column: string) {
    if (this.sortColumnCustomers === column) {
      this.sortDirectionCustomers = this.sortDirectionCustomers === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumnCustomers = column;
      this.sortDirectionCustomers = 'asc';
    }
    this.sortCustomers();
  }



  // Добавим геттеры для фильтрации
  get filteredBarbers() {
    let result = this.barbers;
    // Фильтрация по поиску
    if (this.barberSearchTerm.trim()) {
      const search = this.barberSearchTerm.trim().toLowerCase();
      result = result.filter(barber => barber.name.toLowerCase().includes(search));
    }
    // Применяем сортировку к отфильтрованному массиву
    result = this.sortArray(result, this.sortColumnBarbers, this.sortDirectionBarbers);
    return result;
  }

  get filteredCustomers() {
    let result = this.customers;
    // Фильтрация по поиску
    if (this.customerSearchTerm.trim()) {
      const search = this.customerSearchTerm.trim().toLowerCase();
      result = result.filter(customer => customer.name.toLowerCase().includes(search));
    }
    // Применяем сортировку к отфильтрованному массиву
    result = this.sortArray(result, this.sortColumnCustomers, this.sortDirectionCustomers);
    return result;
  }

  // Перенесём логику сортировки в утилитный метод, чтобы применять её и к отфильтрованному массиву
  private sortArray(array: any[], sortColumn: string, sortDirection: 'asc' | 'desc'): any[] {
    return array.slice().sort((a, b) => {
      const valA = a[sortColumn];
      const valB = b[sortColumn];

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }



  onAddCustomerClick() {
    if (!this.token) {
      this.errorMessage = 'Сначала авторизуйтесь, чтобы добавить клиента.';
      return;
    }

    if (!this.newCustomerName || !this.newCustomerStyle) {
      this.errorMessage = 'Заполните имя и предпочитаемый стиль клиента.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const customerData = {
      name: this.newCustomerName,
      preferredStyle: this.newCustomerStyle
    };

    this.customerService.addCustomer(this.token, customerData).subscribe({
      next: (addedCustomer) => {
        this.isLoading = false;
        this.successMessage = 'Клиент успешно добавлен!';
        this.customers.push(addedCustomer);
        this.sortCustomers();
        // Сбросим поля формы
        this.newCustomerName = '';
        this.newCustomerStyle = '';
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Ошибка при добавлении клиента';
        console.error(err);
      }
    });
  }

  onDeleteCustomerClick(customerId: number) {
    if (!this.token) {
      this.errorMessage = 'Сначала авторизуйтесь, чтобы удалять клиентов.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.customerService.deleteCustomer(this.token, customerId).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Клиент успешно удалён!';
        this.customers = this.customers.filter(c => c.id !== customerId);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Ошибка при удалении клиента';
        console.error(err);
      }
    });
  }
}