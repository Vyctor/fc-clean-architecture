import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import UpdateCustomerUseCase from './update-customer.usecase';

let customer: any;

let input: any;

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
  beforeEach(() => {
    customer = CustomerFactory.createWithAddress('John', new Address('Street', 1, 'City', 'State', 'Zip'));

    input = {
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
  });

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

  it('should throw an error when name is missing', async () => {
    const customerRepository = MockRepository();
    const usecase = new UpdateCustomerUseCase(customerRepository);

    delete input.name;

    await expect(usecase.execute(input)).rejects.toThrow('Customer: Name is required');
  });

  it('should throw an error when street is missing', async () => {
    const customerRepository = MockRepository();
    const usecase = new UpdateCustomerUseCase(customerRepository);

    delete input.address.street;

    await expect(usecase.execute(input)).rejects.toThrow('Address: Street is required');
  });

  it('should throw an error when city is missing', async () => {
    const customerRepository = MockRepository();
    const usecase = new UpdateCustomerUseCase(customerRepository);

    delete input.address.city;

    await expect(usecase.execute(input)).rejects.toThrow('Address: City is required');
  });

  it('should throw an error when state is missing', async () => {
    const customerRepository = MockRepository();
    const usecase = new UpdateCustomerUseCase(customerRepository);

    delete input.address.state;

    await expect(usecase.execute(input)).rejects.toThrow('Address: State is required');
  });

  it('should throw an error when zip is missing', async () => {
    const customerRepository = MockRepository();
    const usecase = new UpdateCustomerUseCase(customerRepository);

    delete input.address.zip;

    await expect(usecase.execute(input)).rejects.toThrow('Address: Zip is required');
  });
});
