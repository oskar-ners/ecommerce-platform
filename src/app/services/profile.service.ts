import { Injectable, inject } from '@angular/core';
import { Auth, updateProfile } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../interfaces/order.interface';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { Firestore, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  auth = inject(Auth);
  firestore = inject(Firestore);

  profileUserName = new BehaviorSubject<string | null | undefined>('');
  profileUserName$ = this.profileUserName.asObservable();

  userOrders: Order[] = [];

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.profileUserName.next(user.displayName);
      } else {
        this.profileUserName.next(null);
      }
    });
  }

  async getUserOrders(): Promise<Order[]> {
    const uid = this.auth.currentUser?.uid;
    if (!uid) return [];

    const userOrdersCollection = collection(
      this.firestore,
      `users/${uid}/orders`
    );

    try {
      const ordersData = await getDocs(userOrdersCollection);
      const userOrders = ordersData.docs.map((order) => order.data() as Order);
      console.log(`Orders loaded correctly!`);
      return userOrders;
    } catch (error) {
      console.log('Loading user orders failed!');
      throw error;
    }
  }

  changeUserName(newUsername: string): void {
    const user = this.auth.currentUser;
    const userRef = doc(this.firestore, `users/${user?.uid}`);

    if (user) {
      updateDoc(userRef, {
        username: newUsername,
      });
      updateProfile(user, { displayName: newUsername })
        .then(() => {
          this.profileUserName.next(newUsername);
          console.log('Username updated successfully!');
        })
        .catch((error) => {
          console.error('Error updating username:', error);
        });
    } else {
      console.error('No user is signed in.');
    }
  }
}
