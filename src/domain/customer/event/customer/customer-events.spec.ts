import CustomerCreatedEvent from './customer-created.event';
import CreateLogWhenCustomerIsCreatedHandler from './handler/create-log-when-customer-is-created.handler';
import SendValidateAccountEmailWhenCustomerIsCreatedHandler from './handler/send-validate-account-email-when-customer-is-created.handler';
import CustomerAddressUpdatedEvent from './customer-address-updated.event';
import Customer from '../../entity/customer';
import Address from '../../value-object/address';
import EventDispatcher from '../../../shared/event/event-dispatcher';

describe('Customer events tests', () => {
  it('should notify Create Log and Send Validate Account when customer is created', () => {
    const eventDispatcher = new EventDispatcher();

    const customerCreatedEvent = new CustomerCreatedEvent({
      customer: {
        id: 1,
        name: 'Customer 1',
        email: 'customer@customer.com',
        address: {
          street: 'Street 1',
          number: 1,
          city: 'City 1',
          state: 'State 1',
          country: 'Country 1',
          zip_code: 'Zip Code 1',
        },
      },
    });

    const createLogWhenCustomerIsCreatedHandler = new CreateLogWhenCustomerIsCreatedHandler();

    const sendValidateAccountEmailWhenCustomerIsCreatedHandler = new SendValidateAccountEmailWhenCustomerIsCreatedHandler();

    const spyEventHandler1 = jest.spyOn(createLogWhenCustomerIsCreatedHandler, 'handle');

    const spyEventHandler2 = jest.spyOn(sendValidateAccountEmailWhenCustomerIsCreatedHandler, 'handle');

    eventDispatcher.register('CustomerCreatedEvent', createLogWhenCustomerIsCreatedHandler);
    eventDispatcher.register('CustomerCreatedEvent', sendValidateAccountEmailWhenCustomerIsCreatedHandler);

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it('should notify send email when customer address is updated', () => {
    const eventDispatcher = new EventDispatcher();
    const sendValidateAccountEmailWhenCustomerIsCreatedHandler = new SendValidateAccountEmailWhenCustomerIsCreatedHandler();
    const spyEventHandler = jest.spyOn(sendValidateAccountEmailWhenCustomerIsCreatedHandler, 'handle');

    const customer = new Customer('1', 'John Doe');
    const customerAddress = new Address('Street', 1, 'Rio Verde', 'Goiás', '75906-860');

    eventDispatcher.register('CustomerAddressUpdatedEvent', sendValidateAccountEmailWhenCustomerIsCreatedHandler);

    customer.changeAddress(customerAddress);

    const customerAddressUpdatedEvent = new CustomerAddressUpdatedEvent({
      customer: {
        id: 1,
        name: 'Customer 1',
        email: 'customer@customer.com',
        address: {
          street: 'Street 1',
          number: 1,
          city: 'City 1',
          state: 'State 1',
          country: 'Country 1',
          zip_code: 'Zip Code 1',
        },
      },
    });

    eventDispatcher.notify(customerAddressUpdatedEvent);

    expect(spyEventHandler).toBeCalled();
  });
});
