import { Injectable, inject } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { Auth } from '@angular/fire/auth';
import {
  Firestore,
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  firebaseAuth = inject(Auth);
  firestore = inject(Firestore);

  wishlistProductsCount = new BehaviorSubject<number>(0);
  wishlistProductsCount$ = this.wishlistProductsCount.asObservable();

  constructor() {
    this.loadInitialWishlistCount();
  }

  async loadInitialWishlistCount(): Promise<void> {
    const products = await this.getWishlistProducts();
    this.wishlistProductsCount.next(products.length);
  }

  async addToWishlist(product: Product | undefined): Promise<void> {
    if (this.firebaseAuth.currentUser && product) {
      const uid = this.firebaseAuth.currentUser.uid;
      const userDocRef = doc(this.firestore, `users/${uid}`);
      await updateDoc(userDocRef, {
        wishlist: arrayUnion(product),
      });

      await this.updateWishlistCount();
    }
  }

  async removeFromWishlist(product: Product): Promise<void> {
    if (this.firebaseAuth.currentUser && product) {
      const uid = this.firebaseAuth.currentUser.uid;
      const userDocRef = doc(this.firestore, `users/${uid}`);

      await updateDoc(userDocRef, {
        wishlist: arrayRemove(product),
      });

      await this.updateWishlistCount();
    }
  }

  async getWishlistProducts(): Promise<Product[]> {
    const uid = this.firebaseAuth.currentUser?.uid;
    if (uid) {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      const userDoc = await getDoc(userDocRef);

      return userDoc.exists() ? userDoc.data()?.['wishlist'] || [] : [];
    }
    return [];
  }

  async updateWishlistCount(): Promise<void> {
    const products = await this.getWishlistProducts();
    this.wishlistProductsCount.next(products.length);
  }
}
