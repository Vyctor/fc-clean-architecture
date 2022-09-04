import { Sequelize } from 'sequelize-typescript';
import CustomerRepository from '../../../infra/customer/repository/sequelize/customer-repository';
import CustomerModel from '../../../infra/customer/repository/sequelize/customer.model';
import CreateCustomerUseCase from './create-customer.usecase';

let input = {
  name: 'John Doe',
  address: {
    street: 'Street',
    number: 1,
    city: 'City',
    zip: 'Zip',
    state: 'State',
  },
};

describe('Integration test create customer use case', () => {
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
    input = {
      name: 'John Doe',
      address: {
        street: 'Street',
        number: 1,
        city: 'City',
        zip: 'Zip',
        state: 'State',
      },
    };

    await sequelize.close();
  });

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    const customer = await createCustomerUseCase.execute(input);

    const customerCreated = await customerRepository.find(customer.id);

    const output = {
      id: expect.any(String),
      active: false,
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
        state: input.address.state,
      },
    };

    expect(customer).toStrictEqual(output);
    expect({
      id: customerCreated.id,
      name: customerCreated.name,
      active: false,
      address: {
        street: customerCreated.address.street,
        number: customerCreated.address.number,
        zip: customerCreated.address.zip,
        city: customerCreated.address.city,
        state: customerCreated.address.state,
      },
    }).toStrictEqual(output);
  });

  it('should thrown an error when name is missing', async () => {
    const customerRepository = new CustomerRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    input.name = '';
    await expect(customerCreateUseCase.execute(input)).rejects.toThrow();
  });

  it('should thrown an error when street is missing', async () => {
    const customerRepository = new CustomerRepository();
    const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

    input.address.street = '';
    await expect(customerCreateUseCase.execute(input)).rejects.toThrow('Street is required');
  });
});
