import { Component, OnInit, inject } from '@angular/core';
import { BackButtonComponent } from '../back-button/back-button.component';
import { ProfileService } from '../../services/profile.service';
import { Order } from '../../interfaces/order.interface';
import { onAuthStateChanged } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { Timestamp } from 'firebase/firestore';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [BackButtonComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  profileService = inject(ProfileService);
  auth = inject(Auth);

  username: string | null | undefined = '';
  newUsername: string = '';
  orders: Order[] = [];

  async ngOnInit(): Promise<void> {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.orders = await this.profileService.getUserOrders();
      }
    });
    this.profileService.profileUserName$.subscribe((name) => {
      this.username = name;
    });
  }

  onSubmit(form: NgForm, newUsername: string) {
    if (form.valid && newUsername?.length > 0) {
      this.profileService.changeUserName(newUsername);
      this.newUsername = '';
      form.resetForm();
    }
  }

  formatDate(timestamp: Timestamp): string {
    return timestamp.toDate().toLocaleString('pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
}
