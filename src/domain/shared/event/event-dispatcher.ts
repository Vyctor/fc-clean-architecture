import EventDispatcherInterface from './event-dispatcher.interface';
import EventHandlerInterface from './event-handler.interface';
import EventInterface from './event.interface';

class EventDispatcher implements EventDispatcherInterface {
  private _eventHandlers: { [eventName: string]: EventHandlerInterface<EventInterface>[] } = {};

  get eventHandlers(): {
    [eventName: string]: EventHandlerInterface<EventInterface>[];
  } {
    return this._eventHandlers;
  }

  register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    const index = this.eventHandlers[eventName].indexOf(eventHandler);

    if (index >= -1) {
      this.eventHandlers[eventName].splice(index, 1);
    }
  }

  unregisterAll(): void {
    this._eventHandlers = {};
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name;
    const eventHandlers = this.eventHandlers[eventName];

    if (eventHandlers) {
      eventHandlers.forEach((eventHandler) => eventHandler.handle(event));
    }
  }
}

export default EventDispatcher;
