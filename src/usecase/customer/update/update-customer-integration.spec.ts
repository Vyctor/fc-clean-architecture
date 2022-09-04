import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../../infra/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infra/customer/repository/sequelize/customer-repository';
import UpdateCustomerUseCase from './update-customer.usecase';
import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';

describe('Integration test update customer use case', () => {
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

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository();
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

    const address = new Address('Street', 1, 'City', 'State', 'Zip');

    const customer = CustomerFactory.createWithAddress('John Doe', address);

    await customerRepository.create(customer);

    customer.changeName('John Doe Updated');

    await customerRepository.update(customer);

    const updatedCustomer = await updateCustomerUseCase.execute(customer);

    expect(updatedCustomer.id).toBe(customer.id);
    expect(updatedCustomer.name).toBe('John Doe Updated');
  });

  it('should throws if update an inexistent customer', async () => {
    const customerRepository = new CustomerRepository();
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

    const address = new Address('Street', 1, 'City', 'State', 'Zip');

    const customer = CustomerFactory.createWithAddress('John Doe', address);

    expect(async () => {
      await updateCustomerUseCase.execute(customer);
    }).rejects.toBeInstanceOf(Error);
  });
});
