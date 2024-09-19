import { Component, OnInit, inject } from '@angular/core';
import { BackButtonComponent } from '../back-button/back-button.component';
import { BasketService } from '../../services/basket.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [BackButtonComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent implements OnInit {
  basketService = inject(BasketService);

  productsInBasket: (Product | undefined)[] = [];

  ngOnInit(): void {
    this.productsInBasket = this.basketService.getBasketProducts();
  }

  removeProduct(productId: string | undefined): void {
    this.basketService.removeProductFromBasket(productId);
    this.loadBasketItems();
  }

  loadBasketItems(): void {
    this.productsInBasket = this.basketService.getBasketProducts();
  }
}
