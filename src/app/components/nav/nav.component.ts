import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasketService } from '../../services/basket.service';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, LogoutButtonComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  basketService = inject(BasketService);
  auth = inject(Auth);

  numberOfProducts!: number;

  async ngOnInit(): Promise<void> {
    this.basketService.basketProductsCount$.subscribe((count) => {
      this.numberOfProducts = count;
    });
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.numberOfProducts = (
          await this.basketService.getBasketProducts()
        ).length;
      }
    });
  }
}
