import Customer from '../../customer/entity/customer';

import { v4 as uuid } from 'uuid';
import Order from '../entity/order';
import OrderItem from '../entity/order-item';

export default class OrderService {
  public static total(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total, 0);
  }

  public static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (!items || items.length === 0) {
      throw new Error('At least one item are required to place an order');
    }

    const order = new Order(uuid(), customer.name, items);

    customer.addRewardPoints(order.total / 2);

    return order;
  }
}
