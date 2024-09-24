import { Component } from '@angular/core';
import { BackButtonComponent } from "../back-button/back-button.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [BackButtonComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}
