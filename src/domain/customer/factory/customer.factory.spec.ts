import Address from '../value-object/address';
import CustomerFactory from './customer.factory';
describe('Customer factory unit test', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('John');

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John');
    expect(customer.address).toBeUndefined();
    expect(customer.constructor.name).toBe('Customer');
  });

  it('should create a customer with an an address', () => {
    const userAddress = new Address('Street', 1, 'Rio Verde', 'Goiás', '75906-860');
    const customer = CustomerFactory.createWithAddress('Vyctor', userAddress);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('Vyctor');
    expect(customer.address).toBeDefined();
    expect(customer.address).toStrictEqual(userAddress);
    expect(customer.constructor.name).toBe('Customer');
  });
});
