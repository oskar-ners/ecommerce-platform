import { Component, OnInit, inject } from '@angular/core';
import { ListingService } from '../../services/listing.service';
import { Product } from '../../interfaces/product.interface';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.scss',
})
export class SearchModalComponent implements OnInit {
  listingService = inject(ListingService);
  searchService = inject(SearchService);

  products: Product[] = [];
  filteredProducts: Product[] = [];

  async ngOnInit(): Promise<void> {
    this.products = await this.listingService.getAllProducts();
    this.filteredProducts = this.products;
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }
}
