import { Component, Input, inject } from '@angular/core';
import { WishlistService } from '../../../services/wishlist.service';
import { Product } from '../../../interfaces/product.interface';

@Component({
  selector: 'app-add-to-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './add-to-wishlist.component.html',
  styleUrl: './add-to-wishlist.component.scss',
})
export class AddToWishlistComponent {
  wishlistService = inject(WishlistService);

  @Input() product!: Product | undefined;

  async addToWishlist(product: Product | undefined): Promise<void> {
    await this.wishlistService.addToWishlist(product);
  }
}
