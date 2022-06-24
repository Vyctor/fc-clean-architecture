export interface InputUpdateCustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    number: number;
  };
}

export interface OutputUpdateCustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    number: number;
  };
}
