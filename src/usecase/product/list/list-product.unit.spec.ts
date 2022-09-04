import ListProductUseCase from './list-product.usecase';
import ProductFactory from '../../../domain/product/factory/product.factory';

const productOne = ProductFactory.create('a', 'Product 1', 10);
const productTwo = ProductFactory.create('a', 'Product 1', 10);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([productOne, productTwo])),
    update: jest.fn(),
    delete: jest.fn(),
  };
};

describe('Unit test for list product use case', () => {
  it('should list a product', async () => {
    const repository = MockRepository();
    const usecase = new ListProductUseCase(repository);

    const output = await usecase.execute();

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(productOne.id);
    expect(output.products[0].name).toBe(productOne.name);
    expect(output.products[0].price).toBe(productOne.price);
  });
});
