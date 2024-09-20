import { Component, OnInit, inject } from '@angular/core';
import { TotalsService } from '../../services/totals.service';
import { Product } from '../../interfaces/product.interface';
import { BasketService } from '../../services/basket.service';

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

  orderTotal: number = 0;

  products: (Product | undefined)[] = [];

  ngOnInit(): void {
    this.orderTotal = this.totalsService.getOrderTotal();
    this.products = this.basketService.getBasketProducts();
  }
}
