import { Product } from './product.model';

// cart items
export interface CartItem {
  product: Product;
  quantity: number;
  discount_product?: number;
  discount_user?:number;
}
