import { Injectable, inject } from '@angular/core';
import { BasketService } from './basket.service';

@Injectable({
  providedIn: 'root',
})
export class TotalsService {
  basketService = inject(BasketService);

  async getOrderTotal(): Promise<number> {
    let orderTotal = 0;
    const products = await this.basketService.getBasketProducts();
    products.forEach((product) => {
      if (product.discount) {
        orderTotal += product?.price + product.discountValue;
      } else {
        orderTotal += product?.price || 0;
      }
    });
    return orderTotal;
  }
}
