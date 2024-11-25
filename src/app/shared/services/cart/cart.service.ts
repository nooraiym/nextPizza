import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaymentStatus } from '../../../pages/profile/components/status-badge/status-badge.model';
import { DELIVERY_COST } from '../../constants';
import { Ingredient } from '../ingredients/ingredients.model';
import { Order, OrderProduct, UserOrderList } from '../orders/orders.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private userOrderList!: UserOrderList;
  private cart: Order = {
    orderId: Date.now(),
    address: '',
    orderDate: new Date().toISOString(),
    products: [],
    totalCost: 0,
    totalCostWithDelivery: 0,
    status: PaymentStatus.Pending,
  };
  private cartSubject = new BehaviorSubject<Order>(this.cart);
  cart$ = this.cartSubject.asObservable();

  private updateTotalCost(): void {
    this.cart.totalCost = this.cart.products.reduce(
      (total, product) => total + product.totalPrice,
      0
    );
    this.cart.totalCostWithDelivery =
      this.cart.totalCost > 0 ? this.cart.totalCost + DELIVERY_COST : 0;
    this.cartSubject.next({ ...this.cart });
  }
  private calculateTotalPrice(
    basePrice: number,
    extraOptions: Ingredient[] = [],
    quantity: number
  ): number {
    const ingredientsPrice = (extraOptions || []).reduce(
      (sum, opt) => sum + opt.price,
      0
    );
    return (basePrice + ingredientsPrice) * quantity;
  }
  private isSameProduct(
    product1: OrderProduct,
    product2: OrderProduct
  ): boolean {
    if (product1.id !== product2.id) {
      return false;
    }

    if (product1.extraOptions.length !== product2.extraOptions.length) {
      return false;
    }

    return product1.extraOptions.every((opt, index) => {
      const otherOpt = product2.extraOptions[index];
      return opt.id === otherOpt.id && opt.price === otherOpt.price;
    });
  }
  private removeProduct(productId: number, extraOptions: Ingredient[]): void {
    this.cart.products = this.cart.products.filter(
      (product) =>
        product.id !== productId ||
        !this.isSameProduct(product, {
          id: productId,
          extraOptions,
        } as OrderProduct)
    );
  }

  addToCart(product: OrderProduct): void {
    const existingProduct = this.cart.products.find((p) =>
      this.isSameProduct(p, product)
    );

    if (existingProduct) {
      existingProduct.quantity += product.quantity;
      existingProduct.totalPrice = this.calculateTotalPrice(
        product.price,
        existingProduct.extraOptions,
        existingProduct.quantity
      );
    } else {
      this.cart.products.push({
        ...product,
        totalPrice: this.calculateTotalPrice(
          product.price,
          product.extraOptions || [],
          product.quantity
        ),
      });
    }
    this.updateTotalCost();
    this.cartSubject.next({ ...this.cart });
  }

  getCart(): Order {
    return this.cart;
  }

  clearCart(): void {
    this.cart.products = [];
    this.cart.totalCost = 0;
    this.cart.totalCostWithDelivery = 0;
    this.cartSubject.next({ ...this.cart });
  }

  increaseQuantity(productId: number, extraOptions: Ingredient[]): void {
    const item = this.cart.products.find(
      (i) =>
        i.id === productId &&
        this.isSameProduct(i, { id: productId, extraOptions } as OrderProduct)
    );

    if (item) {
      item.quantity++;
      item.totalPrice = this.calculateTotalPrice(
        item.price,
        item.extraOptions,
        item.quantity
      );
      this.updateTotalCost();
      this.cartSubject.next({ ...this.cart });
    }
  }

  decreaseQuantity(productId: number, extraOptions: Ingredient[]): void {
    const item = this.cart.products.find(
      (i) =>
        i.id === productId &&
        this.isSameProduct(i, { id: productId, extraOptions } as OrderProduct)
    );

    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
        item.totalPrice = this.calculateTotalPrice(
          item.price,
          item.extraOptions,
          item.quantity
        );
      } else {
        this.removeProduct(productId, extraOptions);
      }
      this.updateTotalCost();
      this.cartSubject.next({ ...this.cart });
    }
  }

  getTotalQuantity(): number {
    return this.cart.products.reduce(
      (total, product) => total + product.quantity,
      0
    );
  }

  completeOrder(address: string): void {
    if (this.cart.products.length > 0) {
      this.cart.address = address;
      this.cart.status = PaymentStatus.Paid;
      this.userOrderList.orders.push({ ...this.cart });

      this.cart = {
        orderId: Date.now(),
        address: '',
        orderDate: new Date().toISOString(),
        products: [],
        totalCost: 0,
        totalCostWithDelivery: 0,
        status: PaymentStatus.Pending,
      };
      this.cartSubject.next(this.cart);
    }
  }
}
