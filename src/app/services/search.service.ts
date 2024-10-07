import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  isSearchOpen = signal<boolean>(false);
}
