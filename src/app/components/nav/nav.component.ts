import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasketService } from '../../services/basket.service';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, LogoutButtonComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  basketService = inject(BasketService);
}
