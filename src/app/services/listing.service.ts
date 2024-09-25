import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Product } from '../interfaces/product.interface';
import { collection, getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  firestore = inject(Firestore);

  async getAllProducts(): Promise<Product[]> {
    const categories = ['cars', 'furniture', 'clothes', 'electronics'];
    const promises = categories.map((category) =>
      getDocs(collection(this.firestore, 'categories', category, 'products'))
    );

    try {
      const snapshots = await Promise.all(promises);
      let products: Product[] = [];

      snapshots.forEach((snapshot) => {
        snapshot.forEach((doc) => {
          products.push(doc.data() as Product);
        });
      });

      return products;
    } catch (error) {
      throw error;
    }
  }
}
