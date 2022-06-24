import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import UpdateCustomerUseCase from './update-customer.usecase';

const customer = CustomerFactory.createWithAddress('John', new Address('Street', 1, 'City', 'State', 'Zip'));

const input = {
  id: customer.id,
  name: 'John Doe',
  address: {
    street: 'Street Updated',
    number: 1234,
    city: 'City Updated',
    zip: 'Zip Updated',
    state: 'State Updated',
  },
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
};

describe('Unit test for customer update usecase', () => {
  it('should update a customer', async () => {
    const customerRepository = MockRepository();
    const usecase = new UpdateCustomerUseCase(customerRepository);

    const expectedOutput = {
      id: customer.id,
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        zip: input.address.zip,
        state: input.address.state,
      },
    };

    const useCaseResult = await usecase.execute(input);

    expect(useCaseResult).toEqual(expectedOutput);
  });
});
