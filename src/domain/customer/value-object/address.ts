export default class Address {
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
    this._street = street;
    this._city = city;
    this._state = state;
    this._zip = zip;
    this._number = number;

    this.validate();
  }

  private validate(): void {
    if (!this.street || this.street.length === 0) {
      throw new Error('Street is required');
    }
    if (!this.city && this.city.length === 0) {
      throw new Error('City is required');
    }
    if (!this.state || this.state.length === 0) {
      throw new Error('State is required');
    }
    if (!this.zip || this.zip.length === 0) {
      throw new Error('Zip is required');
    }
  }

  toString() {
    return `${this.street} ${this.number},  ${this.city}, ${this.state} ${this.zip}`;
  }
}
