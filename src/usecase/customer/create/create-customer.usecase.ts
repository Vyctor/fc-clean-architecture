import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import { InputFindCustomerDTO, OutputFindCustomerDTO } from '../find/find-customer.dto';

export default class CreateCustomerUseCase {
  private readonly customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  public async execute(): Promise<OutputFindCustomerDTO> {}
}
