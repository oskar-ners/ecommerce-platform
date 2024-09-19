import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  email: string = '';
  password: string = '';

  async onSubmit(form: NgForm): Promise<void> {
    if (form.valid) {
      await this.authService.login(this.email, this.password);
      this.router.navigateByUrl('homepage');
    }
  }
}
