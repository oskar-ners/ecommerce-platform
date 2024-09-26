import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasketService } from '../../services/basket.service';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { NavModalMobileService } from '../../services/nav-modal-mobile.service';
import { NavModalMobileComponent } from "../nav-modal-mobile/nav-modal-mobile.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, LogoutButtonComponent, NavModalMobileComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  basketService = inject(BasketService);
  auth = inject(Auth);
  navModalMobileService = inject(NavModalMobileService);

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

  openMobileModal(): void {
    this.navModalMobileService.isModalOpen.update((value) => !value);
  }
}
