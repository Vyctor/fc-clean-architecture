import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../../infra/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infra/customer/repository/sequelize/customer-repository';
import ListCustomerUseCase from './list-customer.usecase';
import Address from '../../../domain/customer/value-object/address';
import CustomerFactory from '../../../domain/customer/factory/customer.factory';

describe('Integration test list all customers use case', () => {
  let sequelize: Sequelize;

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

  it('should list all products', async () => {
    const customerRepository = new CustomerRepository();
    const listCustomersUseCase = new ListCustomerUseCase(customerRepository);

    const addressOne = new Address('Street', 1, 'City', 'State', 'Zip');
    const addressTwo = new Address('Street', 1, 'City', 'State', 'Zip');

    const customerOne = CustomerFactory.createWithAddress('John Doe', addressOne);

    const customerTwo = CustomerFactory.createWithAddress('David Doe', addressTwo);

    await customerRepository.create(customerOne);
    await customerRepository.create(customerTwo);

    const result = await listCustomersUseCase.execute();

    expect(result.customers.length).toBe(2);
    expect(result.customers[0].id).toBe(customerOne.id);
    expect(result.customers[0].name).toBe(customerOne.name);
    expect(result.customers[1].id).toBe(customerTwo.id);
    expect(result.customers[1].name).toBe(customerTwo.name);
  });
});
