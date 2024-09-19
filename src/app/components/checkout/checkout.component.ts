import { Component, OnInit, inject } from '@angular/core';
import { TotalsService } from '../../services/totals.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  totalsService = inject(TotalsService);

  orderTotal: number = 0;

  ngOnInit(): void {
    this.orderTotal = this.totalsService.getOrderTotal();
  }
}
