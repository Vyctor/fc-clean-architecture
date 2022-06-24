import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../../infra/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infra/customer/repository/sequelize/customer-repository';
import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import FindCustomerUseCase from './find-customer.usecase';

let sequelize: Sequelize;

describe('Test find customer use case', () => {
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

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerUseCase(customerRepository);
    const customer = new Customer('1', 'John Doe');
    const address = new Address('Street', 1, 'City', 'State', 'Zip');
    customer.address = address;

    const customerCreated = await customerRepository.create(customer);

    const input = {
      id: '1',
    };

    const expectedOutput = {
      id: '123',
      name: 'John Doe',
      address: {
        street: 'Street',
        number: 1,
        city: 'City',
        state: 'State',
        zip: 'Zip',
      },
    };

    const useCaseResult = usecase.execute(input);

    expect(useCaseResult).toEqual(expectedOutput);
  });
});
