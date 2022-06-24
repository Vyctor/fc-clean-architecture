import CreateCustomerUseCase from './create-customer.usecase';

const input = {
  name: 'John',
  address: {
    street: 'Street',
    number: 1,
    city: 'City',
    zip: 'Zip',
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
      },
      active: false,
    };

    const useCaseResult = await usecase.execute(input);

    expect(useCaseResult).toEqual(expectedOutput);
  });
});
