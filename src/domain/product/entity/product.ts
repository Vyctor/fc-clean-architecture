import { Entity } from '../../shared/entity/entity.abstract';
import { NotificationError } from '../../shared/notification/notification.error';
import ProductInterface from './product.interface';

export default class Product extends Entity implements ProductInterface {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  get price(): number {
    return this._price;
  }

  get name(): string {
    return this._name;
  }

  public changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  public changePrice(price: number): void {
    this._price = price;
    this.validate();
  }

  private validate(): void {
    this.validateId();
    this.validateName();
    this.validatePrice();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  private validateId(): void {
    if (!this._id) {
      this.notification.addError({
        message: 'Id is required',
        context: 'Product',
      });
    }
  }

  private validateName(): void {
    if (!this._name) {
      this.notification.addError({
        message: 'Name is required',
        context: 'Product',
      });
    }
  }

  private validatePrice(): void {
    if (!this._price || this.price <= 0) {
      this.notification.addError({
        message: 'Price is required and need to be greater than 0',
        context: 'Product',
      });
    }
  }
}
