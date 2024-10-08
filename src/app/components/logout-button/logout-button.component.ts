import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [],
  template: ` <button class="logout-btn" (click)="logout()">Logout</button> `,
  styles: `
  .logout-btn {
    padding: 10px;
    background-color: #ff4c4c;
    color: #fff;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    text-transform: uppercase;
    letter-spacing: 2px;
        &:hover {
            background-color: #ff1a1a;
            transform: translateY(-2px);
        }
        &:active {
            background-color: #e60000;
            transform: translateY(0);
        }
    }
    @media (max-width: 768px) {
    .logout-btn {
        font-size: 0.9rem;
    }
    }
  `,
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
