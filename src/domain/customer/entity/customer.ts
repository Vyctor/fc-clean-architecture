import Address from '../value-object/address';
import { Entity } from '../../shared/entity/entity.abstract';
import { NotificationError } from '../../shared/notification/notification.error';
import { CustomerValidatorFactory } from '../factory/customer.validator.factory';

class Customer extends Entity {
  private _name: string;

  private _address!: Address;

  private _active: boolean = false;

  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  set address(address: Address) {
    this._address = address;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  addRewardPoints(points: number): void {
    this._rewardPoints += points;
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  isActive(): boolean {
    return this._active;
  }

  activate(): void {
    if (!this.address) {
      throw new Error('Address is mandatory to activate a customer');
    }
    this._active = true;
  }

  deactivate(): void {
    this._active = false;
  }

  validate(): void {
    CustomerValidatorFactory.create().validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }
}

export default Customer;
