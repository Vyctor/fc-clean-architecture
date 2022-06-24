import ProductInterface from './product.interface';
export default class ProductB implements ProductInterface {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  get id(): string {
    return this._id;
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
  }

  private validateId(): void {
    if (!this._id) {
      throw new Error('Id is required');
    }
  }

  private validateName(): void {
    if (!this._name) {
      throw new Error('Name is required');
    }
  }

  private validatePrice(): void {
    if (!this._price || this.price <= 0) {
      throw new Error('Price is required and need to be greater than 0');
    }
  }
}
