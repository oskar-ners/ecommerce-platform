import { Timestamp } from 'firebase/firestore';
import { Product } from './product.interface';

export interface Order {
  created_at: Timestamp;
  order_id: string;
  ordered_products: Product[];
  price: number;
}
