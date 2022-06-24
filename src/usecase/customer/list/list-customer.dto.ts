type Customer = {
  id: string;
  name: string;
  address: {
    state: string;
    city: string;
    street: string;
    number: string;
    zip: string;
  };
};
export interface OutputListCustomerDTO {
  customers: Customer[];
}
