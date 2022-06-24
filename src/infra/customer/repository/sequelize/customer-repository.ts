import Customer from '../../../../domain/customer/entity/customer';
import CustomerRepositoryInterface from '../../../../domain/customer/repository/customer-repository.interface';
import Address from '../../../../domain/customer/value-object/address';
import CustomerModel from './customer.model';

class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zip,
      city: entity.address.city,
      state: entity.address.state,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        id: entity.id,
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zipcode: entity.address.zip,
        city: entity.address.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where: { id: entity.id },
      },
    );
  }

  async delete(id: string): Promise<void> {
    await CustomerModel.destroy({
      where: {
        id,
      },
    });
  }

  async find(id: string): Promise<Customer> {
    try {
      const customerModel = await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true });

      const customer = new Customer(customerModel.id, customerModel.name);
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.city,
        customerModel.state,
        customerModel.zipcode,
      );

      customer.changeAddress(address);

      if (customerModel.active) {
        customer.activate();
      }

      return customer;
    } catch (error) {
      throw new Error('Customer not found');
    }
  }

  async findAll(): Promise<Customer[]> {
    const customers = await CustomerModel.findAll();

    return customers.map((customer) => {
      const customerEntity = new Customer(customer.id, customer.name);

      const address = new Address(customer.street, customer.number, customer.city, customer.state, customer.zipcode);

      customerEntity.changeAddress(address);

      if (customer.active) {
        customerEntity.activate();
      }

      return customerEntity;
    });
  }
}

export default CustomerRepository;
