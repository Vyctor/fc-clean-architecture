import OrderItem from './order-item';

export default class Order {
  private _id: string;
  private _customer_id: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customer_id: string, items: OrderItem[]) {
    this._id = id;
    this._customer_id = customer_id;
    this._items = items;
    this._total = this.calculateTotal();
    this.validate();
  }

  private calculateTotal(): number {
    return this._items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  get id(): string {
    return this._id;
  }

  get total(): number {
    return this._total;
  }

  get customer_id(): string {
    return this._customer_id;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  addItem(item: OrderItem): void {
    this._items.push(item);
    this._total = this.calculateTotal();
  }

  private validate(): void {
    if (!this.id) {
      throw new Error('Id is required');
    }
    if (!this.customer_id) {
      throw new Error('Customer Id is required');
    }
    if (!this.items || this.items.length === 0) {
      throw new Error('At least one item is required to proceed the purchase');
    }
  }
}
