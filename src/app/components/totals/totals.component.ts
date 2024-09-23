import { Component, Input, inject } from '@angular/core';
import { TotalsService } from '../../services/totals.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-totals',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './totals.component.html',
  styleUrl: './totals.component.scss',
})
export class TotalsComponent {
  totalsService = inject(TotalsService);

  @Input() orderTotal: number = 0;
}
