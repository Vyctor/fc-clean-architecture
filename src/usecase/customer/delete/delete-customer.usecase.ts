import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import { InputDeleteCustomerDTO } from './delete-customer.dto';

export default class DeleteCustomerUseCase {
  private readonly customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputDeleteCustomerDTO): Promise<void> {
    await this.customerRepository.delete(input.id);
  }
}
