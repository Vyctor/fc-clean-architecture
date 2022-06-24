import Address from '../value-object/address';
import Customer from './customer';

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Customer(undefined, 'John');
    }).toThrowError('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      new Customer('123', '');
    }).toThrowError('Name is required');
  });

  it('should change name', () => {
    let customer = new Customer('1', 'Vyctor');
    customer.changeName('Marcos');
    expect(customer.name).toBe('Marcos');
  });

  it('should activate customer', () => {
    const userAddress = new Address('Street', 1, 'Rio Verde', 'Goiás', '75906-860');

    let customer = new Customer('1', 'Vyctor');

    customer.changeAddress(userAddress);

    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it('should deactivate customer', () => {
    let customer = new Customer('1', 'Vyctor');
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it('should throw error when address is undefined', () => {
    let customer = new Customer('1', 'Vyctor');

    expect(() => {
      customer.activate();
    }).toThrowError('Address is mandatory to activate a customer');
  });

  it('should add reward points', () => {
    const customer = new Customer('1', 'Vyctor');

    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(100);

    expect(customer.rewardPoints).toBe(100);

    customer.addRewardPoints(100);

    expect(customer.rewardPoints).toBe(200);
  });
});
