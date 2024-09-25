export interface Product {
  category: string;
  description: string;
  discount: boolean;
  discountValue: number;
  id: string;
  image: string;
  name: string;
  price: number;
  material?: string;
  sizes?: string[];
  specs?: string[];
  availableColors?: string[];
}
