type Customer = {
  id: string;
  name: string;
  address: {
    state: string;
    city: string;
    street: string;
    number: number;
    zip: string;
  };
};

export interface OutputListCustomerDTO {
  customers: Array<Customer>;
}
