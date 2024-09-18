import { Injectable } from '@angular/core';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  async register(email: string, password: string): Promise<void> {
    const auth = getAuth();
    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('New account created! ' + userData.user.email);
    } catch {
      console.warn('Registration failed! Something went wrong!');
    }
  }

  async login(email: string, password: string): Promise<void> {
    const auth = getAuth();
    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
      console.log('Welcome! You signed In! ' + userData.user.email);
    } catch {
      console.warn('Something went wrong when you tried to sign in!');
    }
  }

  async signOut(): Promise<void> {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log('You signed out!');
    } catch {
      console.warn('Something went wrong when you tried to sign out!');
    }
  }
}
