import { Sequelize } from 'sequelize-typescript';
import Order from '../../../../domain/checkout/entity/order';
import OrderItem from '../../../../domain/checkout/entity/order-item';
import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/value-object/address';
import Product from '../../../../domain/product/entity/product';
import CustomerRepository from '../../../customer/repository/sequelize/customer-repository';
import CustomerModel from '../../../customer/repository/sequelize/customer.model';
import ProductRepository from '../../../product/repository/sequelize/product-repository';
 import ProductModel from '../../../product/repository/sequelize/product.model';
import OrderItemModel from './order-item.model';
 
import OrderRepository from './order-repository';
import OrderModel from './order.model';
 

let sequelize: Sequelize;

describe('Order repository test', () => {
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([OrderModel, OrderItemModel, ProductModel, CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street', 1, 'City', 'State', '12312323');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem('123', product.id, product.name, product.price, 2);

    const order = new Order('123', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order.total,
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '123',
          product_id: '123',
        },
      ],
    });
  });

  it('should update an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street', 1, 'City', 'State', '12312323');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    const product2 = new Product('456', 'Product 2', 10);
    await productRepository.create(product);
    await productRepository.create(product2);

    const orderItem = new OrderItem('123', product.id, product.name, product.price, 2);
    const orderItem2 = new OrderItem('456', product2.id, product2.name, product2.price, 2);

    const order = new Order('123', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    order.addItem(orderItem2);

    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel).toBeDefined();
    expect(orderModel.items.length).toBe(2);
    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order.total,
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: product.id,
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: order.id,
          product_id: product2.id,
        },
      ],
    });
  });

  it('it should be able to find a order by id', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street', 1, 'City', 'State', '12312323');
    customer.address = address;

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem('123', product.id, product.name, product.price, 2);

    const order = new Order('123', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const findOrder = await orderRepository.find(order.id);

    expect(findOrder).toBeDefined();
    expect(findOrder.id).toBe(order.id);
    expect(findOrder.customer_id).toBe(order.customer_id);
    expect(findOrder.total).toBe(order.total);
    expect(findOrder.items.length).toBe(1);
    expect(findOrder.items).toMatchObject(order.items);
  });

  it('it should be able to find all orders', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street', 1, 'City', 'State', '12312323');
    customer.address = address;

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    const product2 = new Product('456', 'Product 2', 10);
    const product3 = new Product('789', 'Product 3', 10);

    await productRepository.create(product);
    await productRepository.create(product2);
    await productRepository.create(product3);

    const orderItem = new OrderItem('123', product.id, product.name, product.price, 2);
    const orderItem2 = new OrderItem('456', product2.id, product2.name, product2.price, 2);
    const orderItem3 = new OrderItem('789', product2.id, product2.name, product2.price, 2);

    const order = new Order('123', customer.id, [orderItem]);
    const order2 = new Order('456', customer.id, [orderItem2]);
    const order3 = new Order('789', customer.id, [orderItem3]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    await orderRepository.create(order2);
    await orderRepository.create(order3);

    const orders = await orderRepository.findAll();

    expect(orders).toBeDefined();
    expect(orders).toHaveLength(3);
    expect(orders).toBeInstanceOf(Array<Order>)
    expect(orders[0]).toMatchObject(order)
    expect(orders[1]).toMatchObject(order2)
    expect(orders[2]).toMatchObject(order3)
  });

  it("it should be able to delete an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street', 1, 'City', 'State', '12312323');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem('123', product.id, product.name, product.price, 2);

    const order = new Order('123', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const placedOrder = await orderRepository.find(order.id);

    expect(placedOrder).toBeDefined();
    expect(placedOrder).toBeInstanceOf(Order);

    await orderRepository.delete(order.id);

    const deletedOrder = await orderRepository.find(order.id);

    expect(deletedOrder).toBeUndefined();
  })
});
