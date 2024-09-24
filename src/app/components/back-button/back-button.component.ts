import { Component, Input, inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss',
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
