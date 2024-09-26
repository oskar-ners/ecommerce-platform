import { Component, Input, inject } from '@angular/core';
import { TotalsService } from '../../services/totals.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-totals',
  standalone: true,
  imports: [RouterLink],
  template: `
    <span style="font-size: 20px; font-weight: bold;"
      >Order Total: {{ orderTotal }}zł</span
    >
    <button routerLink="/checkout" class="checkout-button">
      Go to Checkout
    </button>
  `,
  styles: `
    .checkout-button {
        background-color: #28a745;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 1rem 2rem;
        cursor: pointer;
        margin-top: 1rem;
        transition: background-color 0.3s;
        display: block;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 2px;
        &:hover {
            background-color: #218838;
        }
    }
  `,
})
export class TotalsComponent {
  totalsService = inject(TotalsService);

  @Input() orderTotal: number = 0;
}
