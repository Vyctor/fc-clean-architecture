import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import ListCustomerUseCase from './list-customer.usecase';

const customerOne = CustomerFactory.createWithAddress('John Doe', new Address('Street', 1, 'City', 'State', 'Zip'));

const customerTwo = CustomerFactory.createWithAddress('Jane Doe', new Address('Street 2', 2, 'City 2', 'State 2', 'Zip 2'));

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customerOne, customerTwo])),
    update: jest.fn(),
    delete: jest.fn(),
  };
};

describe('Unit test for list customer use case', () => {
  it('should list a customer', async () => {
    const repository = MockRepository();
    const usecase = new ListCustomerUseCase(repository);

    const output = await usecase.execute();

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customerOne.id);
    expect(output.customers[0].name).toBe(customerOne.name);
    expect(output.customers[0].address.street).toBe(customerOne.address.street);
  });
});
