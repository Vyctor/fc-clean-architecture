import { toXML } from 'jstoxml';
import { OutputListCustomerDTO } from '../../../usecase/customer/list/list-customer.dto';

export class CustomerPresenter {
  static toXML(data: OutputListCustomerDTO): string {
    const xmlOptions = {
      header: true,
      indent: '  ',
      newline: '\n',
      allowEmpty: true,
    };

    return toXML(
      {
        customers: {
          customer: data.customers.map((customer) => ({
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.address.street,
              number: customer.address.number,
              city: customer.address.city,
              state: customer.address.state,
              zip: customer.address.zip,
            },
          })),
        },
      },
      xmlOptions,
    );
  }
}
