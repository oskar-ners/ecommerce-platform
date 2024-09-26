import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-price',
  standalone: true,
  imports: [],
  template: `
    @if(isDiscount) {
    <span class="price-text"
      >Price:
      <span class="line-through">{{ price }}zł</span>
      <span class="price-discount"
        >{{ totalPrice(price, discountValue) }}zł</span
      >
    </span>
    } @else {
    <p class="price-text">Price: {{ price }}zł</p>
    }
  `,
  styles: `
    .line-through {
        text-decoration: line-through;
        color: #b00;
        font-weight: bold;
    }
    .price-text {
        font-weight: bold;
        color: black;
    }
    .price-discount {
        color: #e63946;
        margin-left: 5px;
    }
  `,
})
export class PriceComponent {
  @Input() isDiscount!: boolean | undefined;
  @Input() discountValue!: number | undefined;
  @Input() price!: number | undefined;

  totalPrice(price: number | undefined, discount: number | undefined) {
    return (price || 0) - (discount || 0);
  }
}
