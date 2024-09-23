import { Component, OnInit, inject } from '@angular/core';
import { BackButtonComponent } from '../back-button/back-button.component';
import { BasketService } from '../../services/basket.service';
import { Product } from '../../interfaces/product.interface';
import { RouterLink } from '@angular/router';
import { TotalsComponent } from '../totals/totals.component';
import { TotalsService } from '../../services/totals.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [BackButtonComponent, TotalsComponent, RouterLink],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent implements OnInit {
  basketService = inject(BasketService);
  totalsService = inject(TotalsService);
  auth = inject(Auth);

  productsInBasket: (Product | undefined)[] = [];
  orderTotal: number = 0;

  async ngOnInit(): Promise<void> {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        await this.loadBasketItems();
        this.updateOrderTotal();
      }
    });
  }

  removeProduct(product: Product | undefined): void {
    if (product) {
      this.basketService.removeProductFromBasket(product).then(() => {
        this.loadBasketItems();
        this.updateOrderTotal();
      });
    }
  }

  async loadBasketItems(): Promise<void> {
    this.productsInBasket = await this.basketService.getBasketProducts();
  }

  async updateOrderTotal(): Promise<void> {
    this.orderTotal = await this.totalsService.getOrderTotal();
  }

  totalPrice(price: number | undefined, discount: number | undefined) {
    return (price || 0) + (discount || 0);
  }
}
