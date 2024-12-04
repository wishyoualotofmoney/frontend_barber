import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class HeaderComponent {
  showAuthForm: boolean = false;
  authForm: FormGroup;

  // Предопределенные логин и пароль
  private validUsername = '123';
  private validPassword = '123';

  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  toggleAuthForm(): void {
    this.showAuthForm = !this.showAuthForm;
  }

  onLogin(): void {
    if (this.authForm.valid) {
      const { username, password } = this.authForm.value;

      if (username === this.validUsername && password === this.validPassword) {
        console.log('Авторизация успешна!');
        this.toggleAuthForm();
      } else {
        console.log('Неверный логин или пароль!');
      }
    }
  }
}