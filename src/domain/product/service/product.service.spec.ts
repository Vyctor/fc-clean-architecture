import Product from '../entity/product';
import ProductService from './product.service';
describe('Product Service unit tests', () => {
  it('should change the price of all products', () => {
    const productOne = new Product('1', 'Product One', 100);
    const productTwo = new Product('2', 'Product Two', 200);

    ProductService.increasePrice([productOne, productTwo], 10);

    expect(productOne.price).toBe(110);
    expect(productTwo.price).toBe(220);
  });
});
