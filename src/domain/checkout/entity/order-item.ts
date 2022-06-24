export default class OrderItem {
  private _id: string;
  private _name: string;
  private _product_id: string;
  private _price: number;
  private _quantity: number;

  constructor(id: string, product_id: string, name: string, price: number, quantity: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._product_id = product_id;
    this._quantity = quantity;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get quantity(): number {
    return this._quantity;
  }

  get product_id(): string {
    return this._product_id;
  }

  private validate(): void {
    this.validateId();
    this.validateQuantity();
    this.validatePrice();
  }

  private validateId(): void {
    if (!this.id) {
      throw new Error('Id is required');
    }
  }

  private validateQuantity(): void {
    if (!this.quantity) {
      throw new Error('Quantity is required and must be greater than zero');
    }
  }
  private validatePrice(): void {
    if (!this.price) {
      throw new Error('Price is required and must be greater than zero');
    }
  }
}
