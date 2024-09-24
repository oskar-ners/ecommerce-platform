import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.scss',
})
export class LogoutButtonComponent {
  authService = inject(AuthService);
  router = inject(Router);

  async logout(): Promise<void> {
    try {
      localStorage.removeItem('products');
      localStorage.removeItem('orderTotal');
      await this.authService.signOut();
      this.router.navigateByUrl('/login');
    } catch (error) {
      console.warn('Problem with logging out');
      throw error;
    }
  }
}
