import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthModalService } from '../services/auth-modal.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class AuthComponent {
  authForm: FormGroup;
  showAuthForm: boolean = true;

  private validUsername = '123';
  private validPassword = '123';

  constructor(private fb: FormBuilder, private authModalService: AuthModalService) {
    this.authForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    // Подписка на изменение состояния видимости
    this.authModalService.isVisible$.subscribe((isVisible) => {
      this.showAuthForm = isVisible;
    });
  }

  onLogin(): void {
    if (this.authForm.valid) {
      const { username, password } = this.authForm.value;

      if (username === this.validUsername && password === this.validPassword) {
        console.log('Авторизация успешна!');
        this.authModalService.close(); // Закрываем форму
      } else {
        console.log('Неверный логин или пароль!');
      }
    }
  }

  onClose(): void {
    this.authModalService.close();
  }
}
