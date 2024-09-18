import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-category-products-view',
  standalone: true,
  imports: [CurrencyPipe],
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
