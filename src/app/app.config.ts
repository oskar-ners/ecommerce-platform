import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ecommerce-platform-67f75',
        appId: '1:781326953807:web:6f21e56335088c5967a93a',
        storageBucket: 'ecommerce-platform-67f75.appspot.com',
        apiKey: 'AIzaSyBiTiRH0r_djcF96EPgLTPOjbRgU3kCpoM',
        authDomain: 'ecommerce-platform-67f75.firebaseapp.com',
        messagingSenderId: '781326953807',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
