import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  basketItemsKey = 'basketItems';

  addProductToBasket(product: Product | undefined): void {
    let basketProducts: (Product | undefined)[] = this.getBasketProducts();
    basketProducts.push(product);
    this.saveBasketProducts(basketProducts);
  }

  removeProductFromBasket(productId: string | undefined) {
    let basketProducts = this.getBasketProducts();
    basketProducts = basketProducts.filter(
      (product) => product.id !== productId
    );
    this.saveBasketProducts(basketProducts);
  }

  getBasketProducts(): Product[] {
    const basketProducts = localStorage.getItem(this.basketItemsKey);
    return basketProducts ? JSON.parse(basketProducts) : [];
  }

  saveBasketProducts(basketProducts: (Product | undefined)[]): void {
    localStorage.setItem(this.basketItemsKey, JSON.stringify(basketProducts));
  }

  clearBasket(): void {
    localStorage.removeItem(this.basketItemsKey);
  }
}
