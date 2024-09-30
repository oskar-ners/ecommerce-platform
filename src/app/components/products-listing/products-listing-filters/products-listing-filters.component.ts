import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../interfaces/product.interface';

@Component({
  selector: 'app-products-listing-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './products-listing-filters.component.html',
  styleUrl: './products-listing-filters.component.scss',
})
export class ProductsListingFiltersComponent {
  @Input() products!: Product[];
  @Output() categoryChange = new EventEmitter<string>();

  category: string = '';

  onCategoryChange(category: string): void {
    this.categoryChange.emit(category);
  }
}
