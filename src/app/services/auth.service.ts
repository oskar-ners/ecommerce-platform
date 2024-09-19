import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);
  async register(email: string, password: string): Promise<void> {
    try {
      const userData = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      console.log('New account created! ' + userData.user.email);
    } catch (error) {
      console.warn('Registration failed! Something went wrong!');
      throw error;
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const userData = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      console.log('Welcome! You signed In! ' + userData.user.email);
    } catch (error) {
      console.warn('Something went wrong when you tried to sign in!');
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('You signed out!');
    } catch {
      console.warn('Something went wrong when you tried to sign out!');
    }
  }

  isLoggedIn(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      onAuthStateChanged(this.auth, (user) => {
        observer.next(!!user);
        observer.complete();
      });
    });
  }
}
