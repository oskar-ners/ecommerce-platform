import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-view-details',
  standalone: true,
  imports: [],
  templateUrl: './product-view-details.component.html',
  styleUrl: './product-view-details.component.scss',
})
export class ProductViewDetailsComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);

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
}
