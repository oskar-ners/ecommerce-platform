import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { BackButtonComponent } from '../back-button/back-button.component';
import { PriceComponent } from '../price/price.component';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [BackButtonComponent, PriceComponent],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss',
})
export class OrderConfirmationComponent implements OnInit {
  orderTotal: number = 0;
  orderID: string = '';
  products: Product[] = [];

  ngOnInit(): void {
    this.orderTotal = Number(localStorage.getItem('orderTotal'));
    this.orderID = String(localStorage.getItem('orderID'));
    const storedProducts = localStorage.getItem('products');
    this.products = storedProducts ? JSON.parse(storedProducts) : [];
  }

  totalPrice(price: number | undefined, discount: number | undefined) {
    return (price || 0) - (discount || 0);
  }
}
