import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';
import { BackButtonComponent } from '../back-button/back-button.component';
import { TitleCasePipe } from '@angular/common';
import { PriceComponent } from '../price/price.component';
import { AddToWishlistComponent } from '../wishlist/add-to-wishlist/add-to-wishlist.component';

@Component({
  selector: 'app-category-products-view',
  standalone: true,
  imports: [
    RouterLink,
    TitleCasePipe,
    BackButtonComponent,
    PriceComponent,
    AddToWishlistComponent,
  ],
  templateUrl: './category-products-view.component.html',
  styleUrl: './category-products-view.component.scss',
})
export class CategoryProductsViewComponent {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  currentCategory: string = '';
  products: Product[] = [];

  ngOnInit(): void {
    this.currentCategory = this.activatedRoute.snapshot.params['categoryName'];
    this.loadProductsByCategoryName();
  }

  async loadProductsByCategoryName(): Promise<void> {
    this.products = await this.productsService.loadProductsByCategoryName(
      this.currentCategory
    );
  }
}
