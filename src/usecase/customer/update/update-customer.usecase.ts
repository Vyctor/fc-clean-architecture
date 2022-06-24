import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from './update-customer.dto';

export default class UpdateCustomerUseCase {
  private readonly customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  public async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {}
}
