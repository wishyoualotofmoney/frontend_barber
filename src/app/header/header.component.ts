import { Component } from '@angular/core';
import { AuthModalService } from '../services/auth-modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule],
})
export class HeaderComponent {
  constructor(private authModalService: AuthModalService) {}

  openAuthModal(): void {
    this.authModalService.open();
  }
}
