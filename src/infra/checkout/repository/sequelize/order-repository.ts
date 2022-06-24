import Order from '../../../../domain/checkout/entity/order';
import OrderItem from '../../../../domain/checkout/entity/order-item';
import OrderRepositoryInterface from '../../../../domain/checkout/repository/order-repository.interface';
import OrderItemModel from './order-item.model';
import OrderModel from './order.model';

class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customer_id,
        total: entity.total,
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.product_id,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      },
    );
  }

  async update(entity: Order): Promise<void> {
    const sequelize = OrderModel.sequelize;
    await sequelize.transaction(async (transaction) => {
      await OrderItemModel.destroy({
        where: {
          order_id: entity.id,
        },
        transaction: transaction,
      });

      const items = entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.product_id,
        quantity: item.quantity,
        order_id: entity.id,
      }));

      await OrderItemModel.bulkCreate(items, { transaction: transaction });

      await OrderModel.update({ total: entity.total }, { where: { id: entity.id }, transaction: transaction });
    });
  }

  async find(id: string): Promise<Order> {
    const order = await OrderModel.findOne({ where: { id }, include: [{ model: OrderItemModel }] });

    if (order) {
      return new Order(
        order.id,
        order.customer_id,
        order.items.map(
          (orderItem) => new OrderItem(orderItem.id, orderItem.product_id, orderItem.name, orderItem.price, orderItem.quantity),
        ),
      );
    }
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    return orders.map(
      (order) =>
        new Order(
          order.id,
          order.customer_id,
          order.items.map(
            (orderItem) => new OrderItem(orderItem.id, orderItem.product_id, orderItem.name, orderItem.price, orderItem.quantity),
          ),
        ),
    );
  }

  async delete(id: string): Promise<void> {
    await OrderModel.destroy({ where: { id } });
  }
}

export default OrderRepository;
