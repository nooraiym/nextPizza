import { PaymentStatus } from '../../../pages/profile/components/status-badge/status-badge.model';

export interface OrderProduct {
  productId: number;
  name: string;
  shortDescription: string;
  imageUrl: string;
  extraOptions: string[];
  quantity: number;
  price: number;
}

export interface Order {
  orderId: number;
  address: string;
  orderDate: string;
  products: OrderProduct[];
  totalCost: number;
  status: PaymentStatus;
}

export interface UserOrderList {
  userId: number;
  userName: string;
  orders: Order[];
}
