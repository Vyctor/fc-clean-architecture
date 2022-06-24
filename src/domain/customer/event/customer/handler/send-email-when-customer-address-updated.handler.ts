import EventHandlerInterface from '../../../../shared/event/event-handler.interface';
import CustomerAddressUpdatedEvent from '../customer-address-updated.event';

class SendEmailWhenCustomerAddressUpdatedHandler implements EventHandlerInterface<CustomerAddressUpdatedEvent> {
  handle(event: CustomerAddressUpdatedEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventData.customer.id}, ${event.eventData.customer.name} alterado para: ${event.eventData.customer.address}`,
    );
  }
}

export default SendEmailWhenCustomerAddressUpdatedHandler;
