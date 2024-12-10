import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from "./footer/footer.component";
import { AuthComponent } from './auth/auth.component'; // Укажите правильный путь к AuthComponent
import { AuthModalService } from './services/auth-modal.service';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AuthComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend_barber';
  isAuthVisible = false;

  constructor(private authModalService: AuthModalService) {
    this.authModalService.isVisible$.subscribe((isVisible) => {
      this.isAuthVisible = isVisible;
    });
}
}
