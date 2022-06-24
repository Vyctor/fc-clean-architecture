import Product from './product';

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Product('', 'Product', 100);
    }).toThrowError('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      new Product('1', '', 100);
    }).toThrowError('Name is required');
  });

  it('should throw error when price is empty', () => {
    expect(() => {
      new Product('1', 'Product', -100);
    }).toThrowError('Price is required and need to be greater than 0');
  });

  it('should change name', () => {
    const product = new Product('1', 'Product', 100);
    product.changeName('New name');
    expect(product.name).toBe('New name');
  });

  it('should change price', () => {
    const product = new Product('1', 'Product', 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
