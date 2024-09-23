import { Component, OnInit, inject } from '@angular/core';
import { TotalsService } from '../../services/totals.service';
import { Product } from '../../interfaces/product.interface';
import { BasketService } from '../../services/basket.service';
import { onAuthStateChanged } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  totalsService = inject(TotalsService);
  basketService = inject(BasketService);
  auth = inject(Auth);

  orderTotal: number = 0;

  products: (Product | undefined)[] = [];

  async ngOnInit(): Promise<void> {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.orderTotal = await this.totalsService.getOrderTotal();
        this.products = await this.basketService.getBasketProducts();
      }
    });
  }

  totalPrice(price: number | undefined, discount: number | undefined) {
    return (price || 0) + (discount || 0);
  }
}
