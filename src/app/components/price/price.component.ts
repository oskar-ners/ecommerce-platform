import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-price',
  standalone: true,
  imports: [],
  templateUrl: './price.component.html',
  styleUrl: './price.component.scss',
})
export class PriceComponent {
  @Input() isDiscount!: boolean | undefined;
  @Input() discountValue!: number | undefined;
  @Input() price!: number | undefined;

  totalPrice(price: number | undefined, discount: number | undefined) {
    return (price || 0) - (discount || 0);
  }
}
