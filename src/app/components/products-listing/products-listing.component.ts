import { Component, OnInit, inject } from '@angular/core';
import { BackButtonComponent } from '../back-button/back-button.component';
import { ListingService } from '../../services/listing.service';
import { Product } from '../../interfaces/product.interface';
import { RouterLink } from '@angular/router';
import { PriceComponent } from '../price/price.component';
import { ProductsListingFiltersComponent } from './products-listing-filters/products-listing-filters.component';
import { AddToWishlistComponent } from "../wishlist/add-to-wishlist/add-to-wishlist.component";

@Component({
  selector: 'app-products-listing',
  standalone: true,
  imports: [
    RouterLink,
    BackButtonComponent,
    PriceComponent,
    ProductsListingFiltersComponent,
    AddToWishlistComponent
],
  templateUrl: './products-listing.component.html',
  styleUrl: './products-listing.component.scss',
})
export class ProductsListingComponent implements OnInit {
  listingService = inject(ListingService);

  products: Product[] = [];
  filteredProducts: Product[] = [];

  async ngOnInit(): Promise<void> {
    this.products = await this.listingService.getAllProducts();
    this.filteredProducts = this.products;
  }

  filterProductsByCategory(category: string) {
    if (category) {
      this.filteredProducts = this.products.filter(
        (product) => product.category === category
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  totalPrice(price: number | undefined, discount: number | undefined) {
    return (price || 0) + (discount || 0);
  }
}
