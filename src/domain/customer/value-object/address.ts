import { Entity } from '../../shared/entity/entity.abstract';
import { NotificationError } from '../../shared/notification/notification.error';
import { AddressValidatorFactory } from '../factory/address.validator.factory';
export default class Address extends Entity {
  private _street: string;

  private _city: string;

  private _state: string;

  private _zip: string;

  private _number: number;

  get street(): string {
    return this._street;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  get zip(): string {
    return this._zip;
  }

  get number(): number {
    return this._number;
  }

  constructor(street: string, number: number, city: string, state: string, zip: string) {
    super();
    this._street = street;
    this._city = city;
    this._state = state;
    this._zip = zip;
    this._number = number;

    this.validate();
  }

  private validate(): void {
    AddressValidatorFactory.create().validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  toString() {
    return `${this.street} ${this.number},  ${this.city}, ${this.state} ${this.zip}`;
  }
}
