import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs } from 'firebase/firestore';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  firestore = inject(Firestore);

  async loadProductsByCategoryName(categoryName: string): Promise<Product[]> {
    const categoryProductsCollection = collection(
      this.firestore,
      'categories',
      categoryName,
      'products'
    );
    try {
      const categoryByNameProducts: Product[] = [];
      const productsData = await getDocs(categoryProductsCollection);

      productsData.forEach((product) => {
        categoryByNameProducts.push(product.data() as Product);
      });
      console.log(`${categoryName} products loaded correctly!`);

      return categoryByNameProducts;
    } catch {
      console.warn('Failed to load products by category name!');
      return [];
    }
  }

  async loadProductByCategoryAndId(
    categoryName: string,
    productId: string
  ): Promise<Product | undefined> {
    const categoryProductsCollection = collection(
      this.firestore,
      'categories',
      categoryName,
      'products'
    );
    try {
      const productsData = await getDocs(categoryProductsCollection);

      const product: Product | undefined = productsData.docs
        .map((doc) => doc.data() as Product)
        .find((product) => product.id === productId);

      console.log(
        `Product with id: ${productId} from category ${categoryName} loaded correctly!`
      );
      return product;
    } catch {
      console.warn('Failed to load product by category and id!');
      return undefined;
    }
  }
}
