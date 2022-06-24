import Order from '../entity/order';
import OrderItem from '../entity/order-item';

interface OrderFactoryProps {
  id: string;
  customer_id: string;
  items: {
    id: string;
    name: string;
    product_id: string;
    quantity: number;
    price: number;
  }[];
}

class OrderFactory {
  static create(orderProps: OrderFactoryProps): Order {
    const items = orderProps.items.map((item) => new OrderItem(item.id, item.product_id, item.name, item.price, item.quantity));

    return new Order(orderProps.id, orderProps.customer_id, items);
  }
}

export default OrderFactory;
