import { Product } from './product';

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
}