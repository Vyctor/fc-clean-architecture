import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import { OutputFindCustomerDTO } from '../find/find-customer.dto';
import { InputCreateCustomerDTO } from './create-customer.dto';
import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import Address from '../../../domain/customer/value-object/address';

export default class CreateCustomerUseCase {
  private readonly customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  public async execute(input: InputCreateCustomerDTO): Promise<OutputFindCustomerDTO> {
    const { name: customerName } = input;
    const { city, number, street, zip, state } = input.address;
    const customer = CustomerFactory.create(customerName);
    const customerAddress = new Address(street, number, city, state, zip);
    customer.address = customerAddress;

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        city: customer.address.city,
        zip: customer.address.zip,
        state: customer.address.state,
      },
      active: customer.isActive(),
    };
  }
}
