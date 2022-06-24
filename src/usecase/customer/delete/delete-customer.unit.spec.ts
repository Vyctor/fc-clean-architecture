import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';
import DeleteCustomerUseCase from './delete-customer.usecase';

const customer = CustomerFactory.createWithAddress('John', new Address('Street', 1, 'City', 'State', 'Zip'));

let input = {
  id: customer.id,
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

describe('Unit test for delete user usecase', () => {
  it('should delete a customer', async () => {
    const customerRepository = MockRepository();
    const usecase = new DeleteCustomerUseCase(customerRepository);

    await usecase.execute(input);

    expect(customerRepository.delete).toHaveBeenCalledWith(input.id);
  });
});
