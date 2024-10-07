import { Component, OnInit, inject } from '@angular/core';
import { BackButtonComponent } from '../back-button/back-button.component';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../interfaces/product.interface';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { PriceComponent } from '../price/price.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [BackButtonComponent, PriceComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  wishlistService = inject(WishlistService);
  auth = inject(Auth);

  wishlistProducts!: Product[];

  async ngOnInit(): Promise<void> {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        await this.loadWishlistItems();
      }
    });
  }

  async loadWishlistItems(): Promise<void> {
    this.wishlistProducts = await this.wishlistService.getWishlistProducts();
  }

  async removeFromWishlist(product: Product): Promise<void> {
    if (product) {
      this.wishlistService.removeFromWishlist(product).then(() => {
        this.loadWishlistItems();
      });
    }
  }
}
