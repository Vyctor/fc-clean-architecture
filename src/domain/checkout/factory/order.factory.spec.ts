import { v4 as uuid } from 'uuid';
import OrderFactory from './order.factory';
describe('Order factory unit test', () => {
  it('should create an order', () => {
    const orderProps = {
      id: uuid(),
      customer_id: uuid(),
      items: [
        {
          id: uuid(),
          name: 'Product 1',
          product_id: uuid(),
          quantity: 1,
          price: 100,
        },
      ],
    };

    const order = OrderFactory.create(orderProps);

    expect(order).toBeDefined();
    expect(order.id).toEqual(orderProps.id);
    expect(order.customer_id).toEqual(orderProps.customer_id);
    expect(order.items).toHaveLength(1);
  });
});
