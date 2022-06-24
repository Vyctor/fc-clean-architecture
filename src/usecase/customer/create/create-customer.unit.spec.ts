import CreateCustomerUseCase from './create-customer.usecase';

let input = {
  name: 'John',
  address: {
    street: 'Street',
    number: 1,
    city: 'City',
    zip: 'Zip',
    state: 'State',
  },
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
};

describe('Unit test create customer use case', () => {
  beforeEach(() => {
    input = {
      name: 'John',
      address: {
        street: 'Street',
        number: 1,
        city: 'City',
        zip: 'Zip',
        state: 'State',
      },
    };
  });
  it('should create a customer', async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    const expectedOutput = {
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        zip: input.address.zip,
        state: input.address.state,
      },
      active: false,
    };

    const useCaseResult = await usecase.execute(input);

    expect(useCaseResult).toEqual(expectedOutput);
  });

  it('should throw an error when name is missing', async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    input.name = '';

    await expect(usecase.execute(input)).rejects.toThrow('Name is required');
  });

  it('should throw an error when street is missing', async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    input.address.street = null;

    await expect(usecase.execute(input)).rejects.toThrow('Street is required');
  });

  it('should throw an error when city is missing', async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    input.address.city = null;

    await expect(usecase.execute(input)).rejects.toThrow('City is required');
  });

  it('should throw an error when state is missing', async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    input.address.state = null;

    await expect(usecase.execute(input)).rejects.toThrow('State is required');
  });

  it('should throw an error when zip is missing', async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    input.address.zip = null;

    await expect(usecase.execute(input)).rejects.toThrow('Zip is required');
  });
});
