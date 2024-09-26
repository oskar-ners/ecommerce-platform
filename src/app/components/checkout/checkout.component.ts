import { Component, OnInit, inject } from '@angular/core';
import { TotalsService } from '../../services/totals.service';
import { Product } from '../../interfaces/product.interface';
import { BasketService } from '../../services/basket.service';
import { onAuthStateChanged } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { RouterLink } from '@angular/router';
import { BackButtonComponent } from '../back-button/back-button.component';
import { PriceComponent } from '../price/price.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, BackButtonComponent, PriceComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  totalsService = inject(TotalsService);
  basketService = inject(BasketService);
  auth = inject(Auth);

  orderTotal: number = 0;

  products: Product[] = [];

  async ngOnInit(): Promise<void> {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.orderTotal = await this.totalsService.getOrderTotal();
        this.products = await this.basketService.getBasketProducts();
      }
    });
  }

  async placeOrder(
    orderTotal: number,
    products: (Product | undefined)[]
  ): Promise<void> {
    this.basketService.placeOrder(orderTotal, products);
  }

  totalPrice(price: number | undefined, discount: number | undefined) {
    return (price || 0) - (discount || 0);
  }
}
