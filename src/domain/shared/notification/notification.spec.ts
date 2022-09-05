import { Notification } from './notification';
import { NotificationError } from './notification.error';

describe('Unit tests for notifications', () => {
  it('should create errors', () => {
    const notification = new Notification();

    const error = {
      message: 'error message',
      context: 'customer',
    };

    notification.addError(error);

    expect(notification.messages('customer')).toBe('customer: error message');

    const error2 = {
      message: 'error message2',
      context: 'customer',
    };

    notification.addError(error2);

    expect(notification.messages('customer')).toBe('customer: error message,customer: error message2');

    const error3 = {
      message: 'error message3',
      context: 'order',
    };

    notification.addError(error3);

    expect(notification.messages('customer')).toBe('customer: error message,customer: error message2');

    expect(notification.messages('order')).toBe('order: error message3');

    expect(notification.messages()).toBe('customer: error message,customer: error message2,order: error message3');
  });

  it('should check if notification has at least one error', () => {
    const notification = new Notification();

    const error = {
      message: 'error message',
      context: 'customer',
    };

    notification.addError(error);

    expect(notification.hasErrors()).toBeTruthy();

    const error2 = {
      message: 'error message2',
      context: 'customer',
    };

    notification.addError(error2);

    expect(notification.hasErrors()).toBeTruthy();

    const error3 = {
      message: 'error message3',
      context: 'order',
    };

    notification.addError(error3);

    expect(notification.hasErrors()).toBeTruthy();

    notification.clear();

    expect(notification.hasErrors()).toBeFalsy();
  });

  it('should get all errors props', () => {
    const notification = new Notification();

    const error = {
      message: 'error message',
      context: 'customer',
    };

    const error2 = {
      message: 'error message 2',
      context: 'customer',
    };

    notification.addError(error);
    notification.addError(error2);

    const errors = notification.getErrors();

    expect(errors).toBeInstanceOf(Array<NotificationError>);
    expect(errors.length).toBe(2);
  });
});
