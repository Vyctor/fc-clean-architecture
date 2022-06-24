import { OutputListCustomerDTO } from './list-customer.dto';
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import Customer from '../../../domain/customer/entity/customer';

export default class ListCustomerUseCase {
  private readonly customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(): Promise<OutputListCustomerDTO> {
    const customers = await this.customerRepository.findAll();

    return OutputMapper.toOutput(customers);
  }
}

class OutputMapper {
  static toOutput(customer: Customer[]): OutputListCustomerDTO {
    return {
      customers: customer.map((c) => ({
        id: c.id,
        name: c.name,
        address: {
          state: c.address.state,
          city: c.address.city,
          street: c.address.street,
          number: c.address.number,
          zip: c.address.zip,
        },
      })),
    };
  }
}
