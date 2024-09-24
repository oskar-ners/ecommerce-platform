import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss',
})
export class OrderConfirmationComponent implements OnInit {
  orderTotal: number = 0;
  products: Product[] = [];

  ngOnInit(): void {
    this.orderTotal = Number(localStorage.getItem('orderTotal'));

    const storedProducts = localStorage.getItem('products');
    this.products = storedProducts ? JSON.parse(storedProducts) : [];
  }

  totalPrice(price: number | undefined, discount: number | undefined) {
    return (price || 0) + (discount || 0);
  }
}
