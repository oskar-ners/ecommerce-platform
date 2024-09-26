import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavModalMobileService {
  isModalOpen = signal(false);
}
