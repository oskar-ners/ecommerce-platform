import { inject, Injectable } from '@angular/core';
import { collection, getDocs } from 'firebase/firestore';
import { PromoCode } from '../interfaces/promo-codes.interface';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PromoCodeService {
  firestore = inject(Firestore);

  async getPromoCodes(): Promise<PromoCode[]> {
    const promoCodesCollection = collection(this.firestore, 'promocodes');
    try {
      const promoCodesDocs = await getDocs(promoCodesCollection);
      return promoCodesDocs.docs.map((doc) => doc.data() as PromoCode);
    } catch (error) {
      return [];
    }
  }
}
