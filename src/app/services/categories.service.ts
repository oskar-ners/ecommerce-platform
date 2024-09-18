import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs } from 'firebase/firestore';
import { Category } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  firestore = inject(Firestore);

  async getCategories(): Promise<Category[]> {
    const categories = collection(this.firestore, 'categories');
    try {
      const categoryList: Category[] = [];
      const categoriesData = await getDocs(categories);

      categoriesData.docs.forEach((doc) => {
        categoryList.push(doc.data() as Category);
      });
      console.log('Categories loaded');

      return categoryList;
    } catch {
      console.warn('Failed to load categories');
      return [];
    }
  }
}
