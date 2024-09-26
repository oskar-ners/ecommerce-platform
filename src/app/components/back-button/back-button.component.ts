import { Component, Input, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [],
  template: `
    @if(isCheckoutSuccess) {
    <button (click)="goToHomepage()" class="homepage-button">
      Go To Homepage
    </button>
    } @else {
    <button (click)="goBack()" class="back-button">Go Back</button>
    }
  `,
  styles: `
  .back-button,
  .homepage-button {
    margin: 94px 0 0 20px;
    padding: 0.8rem 1.5rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
        &:hover {
            background-color: #0056b3;
        }
    }
  `,
})
export class BackButtonComponent {
  location = inject(Location);
  router = inject(Router);

  @Input() isCheckoutSuccess?: boolean = false;

  goBack(): void {
    this.location.back();
  }

  goToHomepage(): void {
    this.router.navigateByUrl('/homepage');
  }
}
