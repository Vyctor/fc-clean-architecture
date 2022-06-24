import OrderService from './order.service';

import Customer from '../../customer/entity/customer';
import OrderItem from '../entity/order-item';
import Order from '../entity/order';

describe('Order service unit tests', () => {
  it('should place an order', () => {
    const customer: Customer = new Customer('1', 'John Doe');

    const orderItem1: OrderItem = new OrderItem('1', '1', 'Item 1', 100.0, 1);

    const order = OrderService.placeOrder(customer, [orderItem1]);

    expect(customer.rewardPoints).toBe(50);
    expect(order.total).toBe(100);
  });

  it('should get total of all orders', () => {
    const itemOne: OrderItem = new OrderItem('1', '1', 'Product One', 100, 1);
    const itemTwo: OrderItem = new OrderItem('2', '2', 'Product Two', 200, 2);

    const orderOne: Order = new Order('1', '1', [itemOne]);
    const orderTwo: Order = new Order('1', '1', [itemTwo]);

    const total = OrderService.total([orderOne, orderTwo]);

    expect(total).toBe(500);
  });
});
