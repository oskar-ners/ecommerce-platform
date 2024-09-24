import { Injectable, inject } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { Auth } from '@angular/fire/auth';
import { Firestore, arrayRemove, doc } from '@angular/fire/firestore';
import { arrayUnion, getDoc, updateDoc } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  firebaseAuth = inject(Auth);
  firestore = inject(Firestore);

  basketProductsCount = new BehaviorSubject<number>(0);
  basketProductsCount$ = this.basketProductsCount.asObservable();

  constructor() {
    this.loadInitialBasketCount();
  }

  async loadInitialBasketCount(): Promise<void> {
    const products = await this.getBasketProducts();
    this.basketProductsCount.next(products.length);
  }

  addProductToBasket(product: Product | undefined): void {
    if (this.firebaseAuth.currentUser && product) {
      const uid = this.firebaseAuth.currentUser.uid;
      const userDocRef = doc(this.firestore, `users/${uid}`);
      updateDoc(userDocRef, {
        cart: arrayUnion(product),
      });

      this.updateBasketCount();
    }
  }
  async removeProductFromBasket(product: Product | undefined): Promise<void> {
    if (this.firebaseAuth.currentUser && product) {
      const uid = this.firebaseAuth.currentUser.uid;
      const userDocRef = doc(this.firestore, `users/${uid}`);

      await updateDoc(userDocRef, {
        cart: arrayRemove(product),
      });

      await this.updateBasketCount();
    }
  }

  async getBasketProducts(): Promise<Product[]> {
    const uid = this.firebaseAuth.currentUser?.uid;
    if (uid) {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      const userDoc = await getDoc(userDocRef);

      return userDoc.exists() ? userDoc.data()?.['cart'] || [] : [];
    }
    return [];
  }

  async updateBasketCount(): Promise<void> {
    const products = await this.getBasketProducts();
    this.basketProductsCount.next(products.length);
  }

  async clearBasket(): Promise<void> {
    const uid = this.firebaseAuth.currentUser?.uid;
    if (uid) {
      await this.getBasketProducts();
      await this.updateBasketCount();

      const userDocRef = doc(this.firestore, `users/${uid}`);
      await updateDoc(userDocRef, {
        cart: [],
      });

      await this.updateBasketCount();
    }
  }
}
