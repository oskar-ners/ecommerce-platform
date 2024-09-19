import { Component, Input, inject } from '@angular/core';
import { TotalsService } from '../../services/totals.service';

@Component({
  selector: 'app-totals',
  standalone: true,
  imports: [],
  templateUrl: './totals.component.html',
  styleUrl: './totals.component.scss',
})
export class TotalsComponent {
  totalsService = inject(TotalsService);

  @Input() orderTotal: number = 0;
}
