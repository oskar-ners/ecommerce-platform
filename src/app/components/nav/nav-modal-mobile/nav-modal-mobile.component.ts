import { Component, Input, OnInit, inject } from '@angular/core';
import { NavModalMobileService } from '../../../services/nav-modal-mobile.service';
import { NgClass } from '@angular/common';
import { LogoutButtonComponent } from '../../logout-button/logout-button.component';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../../services/wishlist.service';

@Component({
  selector: 'app-nav-modal-mobile',
  standalone: true,
  imports: [NgClass, RouterLink, LogoutButtonComponent],
  templateUrl: './nav-modal-mobile.component.html',
  styleUrl: './nav-modal-mobile.component.scss',
})
export class NavModalMobileComponent implements OnInit {
  navModalMobileService = inject(NavModalMobileService);
  wishlistService = inject(WishlistService);

  @Input() numberOfProducts!: number;

  numberOfWishlistProducts!: number;

  async ngOnInit(): Promise<void> {
    this.wishlistService.wishlistProductsCount$.subscribe((count) => {
      this.numberOfWishlistProducts = count;
    });
  }
}
