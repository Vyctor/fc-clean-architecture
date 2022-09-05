import ProductInterface from './product.interface';
import { Entity } from '../../shared/entity/entity.abstract';
import { NotificationError } from '../../shared/notification/notification.error';
export default class ProductB extends Entity implements ProductInterface {
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
    return this._price * 2;
  }

  get name(): string {
    return this._name;
  }

  public changeName(name: string): void {
    this._name = name;
  }

  public changePrice(price: number): void {
    this._price = price;
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
