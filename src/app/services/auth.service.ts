import { Injectable, inject, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);

  isUserLoggedIn = signal<boolean>(false);

  async register(email: string, password: string): Promise<void> {
    try {
      const userData = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.isUserLoggedIn.set(true);
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
      this.isUserLoggedIn.set(true);
      console.log('Welcome! You signed In! ' + userData.user.email);
    } catch (error) {
      console.warn('Something went wrong when you tried to sign in!');
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      this.isUserLoggedIn.set(false);
      console.log('You signed out!');
    } catch {
      console.warn('Something went wrong when you tried to sign out!');
    }
  }
}
