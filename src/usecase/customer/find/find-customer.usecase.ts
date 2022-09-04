import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import { InputFindCustomerDTO, OutputFindCustomerDTO } from './find-customer.dto';
class FindCustomerUseCase {
  private readonly customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputFindCustomerDTO): Promise<OutputFindCustomerDTO> {
    const { id } = input;

    const customer = await this.customerRepository.find(id);

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

export default FindCustomerUseCase;
