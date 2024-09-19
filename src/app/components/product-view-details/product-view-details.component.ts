import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';
import { BackButtonComponent } from '../back-button/back-button.component';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-product-view-details',
  standalone: true,
  imports: [BackButtonComponent],
  templateUrl: './product-view-details.component.html',
  styleUrl: './product-view-details.component.scss',
})
export class ProductViewDetailsComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  basketService = inject(BasketService);

  currentProduct!: Product | undefined;
  currentProductId!: string;
  currentCategoryName!: string;

  ngOnInit(): void {
    this.currentProductId = this.activatedRoute.snapshot.params['id'];
    this.currentCategoryName =
      this.activatedRoute.snapshot.params['categoryName'];
    this.loadProductByCategoryAndId();
  }

  async loadProductByCategoryAndId(): Promise<void> {
    this.currentProduct = await this.productsService.loadProductByCategoryAndId(
      this.currentCategoryName,
      this.currentProductId
    );
  }

  totalPrice(price: number | undefined, discount: number | undefined) {
    return (price || 0) + (discount || 0);
  }

  addToBasket(product: Product | undefined): void {
    this.basketService.addProductToBasket(product);
  }
}
