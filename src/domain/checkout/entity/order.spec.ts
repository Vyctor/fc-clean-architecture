import Order from './order';
import OrderItem from './order-item';
describe('Order unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const orderItem = new OrderItem('1', 'p1', '1', 1, 1);
      const orderItems: OrderItem[] = [];
      orderItems.push(orderItem);

      const order = new Order('', '1', orderItems);
    }).toThrowError('Id is required');
  });

  it('should throw error when customer_id is empty', () => {
    expect(() => {
      const orderItem = new OrderItem('123', 'p2', '1', 1, 1);
      const orderItems: OrderItem[] = [];
      orderItems.push(orderItem);

      const order = new Order('1', undefined, orderItems);
    }).toThrowError('Customer Id is required');
  });

  it('should throw error when no items provided', () => {
    expect(() => {
      const order = new Order('1', '1', []);
    }).toThrowError('At least one item is required to proceed the purchase');
  });

  it('should be able to calculate total value of order', () => {
    const orderItemOne = new OrderItem('1', 'p1', '1', 10, 2);
    const orderItemTwo = new OrderItem('2', 'p2', '1', 100, 1);
    const orderItemThree = new OrderItem('3', 'p3', '1', 200, 1);
    const orderItems: OrderItem[] = [];
    orderItems.push(orderItemOne, orderItemTwo, orderItemThree);

    const order = new Order('1', '1', orderItems);
    expect(order.total).toBe(320);
  });

  it('should throw error when item quantity is zero', () => {
    expect(() => {
      const orderItem = new OrderItem('1', 'p2', '1', 1, 0);
      const orderItems: OrderItem[] = [];
      orderItems.push(orderItem);

      const order = new Order('1', '', orderItems);
    }).toThrowError('Quantity is required and must be greater than zero');
  });
});
