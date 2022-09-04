import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../../infra/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infra/customer/repository/sequelize/customer-repository';
import DeleteCustomerUseCase from './delete-customer.usecase';
import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';

describe('Integration test delete customer use case', () => {
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

  it('should delete a customer', async () => {
    const customerRepository = new CustomerRepository();
    const deleteCustomerUseCase = new DeleteCustomerUseCase(customerRepository);

    const address = new Address('Street', 1, 'City', 'State', 'Zip');

    const customer = CustomerFactory.createWithAddress('John Doe', address);

    await customerRepository.create(customer);

    await deleteCustomerUseCase.execute({ id: customer.id });

    expect(async () => await customerRepository.find(customer.id)).rejects.toThrowError();
  });
});
