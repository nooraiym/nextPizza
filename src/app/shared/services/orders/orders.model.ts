import { PaymentStatus } from '../../../pages/profile/components/status-badge/status-badge.model';
import { Ingredient } from '../ingredients/ingredients.model';
import { Product } from '../products/products.model';

export interface OrderDescription {
  size: string;
  crust: string;
}

export interface OrderProduct extends Product {
  shortDescription: OrderDescription;
  extraOptions: Ingredient[];
  quantity: number;
  totalPrice: number;
}

export interface Order {
  orderId: number;
  address: string;
  orderDate: string;
  products: OrderProduct[];
  totalCost: number;
  totalCostWithDelivery: number;
  status: PaymentStatus;
}

export interface UserOrderList {
  userId: number;
  userName: string;
  orders: Order[];
}
