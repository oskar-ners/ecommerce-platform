import { Component, OnInit, inject } from '@angular/core';
import { BackButtonComponent } from '../back-button/back-button.component';
import { ListingService } from '../../services/listing.service';
import { Product } from '../../interfaces/product.interface';
import { RouterLink } from '@angular/router';
import { PriceComponent } from '../price/price.component';

@Component({
  selector: 'app-products-listing',
  standalone: true,
  imports: [RouterLink, BackButtonComponent, PriceComponent],
  templateUrl: './products-listing.component.html',
  styleUrl: './products-listing.component.scss',
})
export class ProductsListingComponent implements OnInit {
  listingService = inject(ListingService);

  products: Product[] = [];

  async ngOnInit(): Promise<void> {
    this.products = await this.listingService.getAllProducts();
  }

  totalPrice(price: number | undefined, discount: number | undefined) {
    return (price || 0) + (discount || 0);
  }
}
