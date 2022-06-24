import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import FindCustomerUseCase from './find-customer.usecase';

const customer = new Customer('1', 'John Doe');
const address = new Address('Street', 1, 'City', 'State', 'Zip');
customer.address = address;

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
};

describe('Unit test find customer use case', () => {
  it('should find a customer', async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    await customerRepository.create(customer);

    const input = {
      id: '1',
    };

    const expectedOutput = {
      id: '1',
      name: 'John Doe',
      address: {
        street: 'Street',
        number: 1,
        city: 'City',
        zip: 'Zip',
      },
      active: false,
    };

    const useCaseResult = await usecase.execute(input);

    expect(useCaseResult).toEqual(expectedOutput);
  });
});
