import { Component, OnInit, inject } from '@angular/core';
import { TotalsService } from '../../services/totals.service';
import { Product } from '../../interfaces/product.interface';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss',
})
export class OrderConfirmationComponent implements OnInit {
  totalsService = inject(TotalsService);
  basketService = inject(BasketService);

  orderTotal: number = 0;
  products: Product[] = [];

  async ngOnInit(): Promise<void> {
    this.orderTotal = await this.totalsService.getOrderTotal();
    this.products = await this.basketService.getBasketProducts();
  }

  totalPrice(price: number | undefined, discount: number | undefined) {
    return (price || 0) + (discount || 0);
  }
}
