import { Sequelize } from 'sequelize-typescript';
import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/value-object/address';
import CustomerModel from './customer.model';

import CustomerRepository from './customer-repository';

let sequelize: Sequelize;

describe('Customer repository test', () => {
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John Doe');
    const address = new Address('Street', 1, 'City', 'State', '12312323');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'John Doe',
      street: 'Street',
      number: 1,
      zipcode: '12312323',
      city: 'City',
      state: 'State',
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it('should updated a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John Doe');
    const address = new Address('Street', 1, 'City', 'State', '12312323');
    customer.changeAddress(address);

    customerRepository.create(customer);

    customer.changeName('John');

    customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'John',
      street: 'Street',
      number: 1,
      zipcode: '12312323',
      city: 'City',
      state: 'State',
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John Doe');
    const address = new Address('Street', 1, 'City', 'State', '12312323');
    customer.changeAddress(address);

    customerRepository.create(customer);

    const customerResult = await customerRepository.find(customer.id);

    expect(customer).toStrictEqual(customerResult);
  });

  it('should throw if customer is not found', async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find('123123123123123');
    }).rejects.toThrow('Customer not found');
  });

  it('should delete a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John Doe');
    const address = new Address('Street', 1, 'City', 'State', '12312323');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    await customerRepository.delete(customer.id);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } });

    expect(customerModel).toBeNull();
  });

  it('should find all customers', async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer('1', 'John Doe');
    const address1 = new Address('Street', 1, 'City', 'State', '12312323');
    customer1.changeAddress(address1);

    const customer2 = new Customer('2', 'John Doe');
    const address2 = new Address('Street', 1, 'City', 'State', '12312323');
    customer2.changeAddress(address2);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customerResult = await customerRepository.findAll();

    expect(customerResult).toHaveLength(2);
    expect(customerResult).toContainEqual(customer1);
    expect(customerResult).toContainEqual(customer2);
  });
});
