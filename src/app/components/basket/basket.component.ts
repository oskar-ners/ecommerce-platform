import { Component, OnInit, inject } from '@angular/core';
import { BackButtonComponent } from '../back-button/back-button.component';
import { BasketService } from '../../services/basket.service';
import { Product } from '../../interfaces/product.interface';
import { RouterLink } from '@angular/router';
import { TotalsComponent } from '../totals/totals.component';
import { TotalsService } from '../../services/totals.service';

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

  productsInBasket: (Product | undefined)[] = [];
  orderTotal: number = 0;

  ngOnInit(): void {
    this.productsInBasket = this.basketService.getBasketProducts();
    this.updateOrderTotal();
  }

  removeProduct(productId: string | undefined): void {
    this.basketService.removeProductFromBasket(productId);
    this.loadBasketItems();
    this.updateOrderTotal();
  }

  loadBasketItems(): void {
    this.productsInBasket = this.basketService.getBasketProducts();
  }

  updateOrderTotal(): void {
    this.orderTotal = this.totalsService.getOrderTotal();
  }

  totalPrice(price: number | undefined, discount: number | undefined) {
    return (price || 0) + (discount || 0);
  }
}
