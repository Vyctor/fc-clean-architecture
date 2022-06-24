import EventHandlerInterface from '../../../../shared/event/event-handler.interface';
import CustomerCreatedEvent from '../customer-created.event';

class SendValidateAccountEmailWhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log(
      `Esse é o primeiro console.log do evento: CustomerCreated.\n Event Data: ${event.eventData}\nEvent Time: ${event.dateTimeOcurred}`,
    );
  }
}

export default SendValidateAccountEmailWhenCustomerIsCreatedHandler;
