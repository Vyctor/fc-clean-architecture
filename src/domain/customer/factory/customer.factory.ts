import { v4 as uuid } from 'uuid';
import Customer from '../entity/customer';
import Address from '../value-object/address';

class CustomerFactory {
  static create(name: string): Customer {
    return new Customer(uuid(), name);
  }
  static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(uuid(), name);

    customer.address = address;

    return customer;
  }
}

export default CustomerFactory;
