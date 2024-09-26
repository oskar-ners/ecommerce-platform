import { Component, Input, inject } from '@angular/core';
import { NavModalMobileService } from '../../services/nav-modal-mobile.service';
import { NgClass } from '@angular/common';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-modal-mobile',
  standalone: true,
  imports: [NgClass, RouterLink, LogoutButtonComponent],
  templateUrl: './nav-modal-mobile.component.html',
  styleUrl: './nav-modal-mobile.component.scss',
})
export class NavModalMobileComponent {
  navModalMobileService = inject(NavModalMobileService);

  @Input() numberOfProducts!: number;
}
