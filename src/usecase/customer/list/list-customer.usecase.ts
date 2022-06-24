import CustomerRepository from '../../../infra/customer/repository/sequelize/customer-repository';
import { OutputListCustomerDTO } from './list-customer.dto';

export default class ListCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(): Promise<OutputListCustomerDTO> {
    const customers = await this.customerRepository.findAll();
  }
}
