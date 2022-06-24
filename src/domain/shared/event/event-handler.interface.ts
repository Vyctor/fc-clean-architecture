import EventInterface from './event.interface';

interface EventHandlerInterface<T extends EventInterface = EventInterface> {
  handle(event: T): void;
}

export default EventHandlerInterface;
