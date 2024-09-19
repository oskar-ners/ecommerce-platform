import { Component, inject } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  async onSubmit(form: NgForm): Promise<void> {
    if (form.valid) {
      await this.authService.register(this.email, this.password);
      this.router.navigateByUrl('homepage');
    } else {
      this.errorMessage = 'Form is not valid. Please check the input fields.';
    }
  }
}
