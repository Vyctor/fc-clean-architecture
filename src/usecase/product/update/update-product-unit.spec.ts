import ProductFactory from '../../../domain/product/factory/product.factory';
import { UpdateProductUseCase } from './update-product-usecase';

const product = ProductFactory.create('a', 'bike', 1);

const input = {
  id: product.id,
  name: 'bike Updated',
  price: 4,
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
};

describe('Unit test update product use case', () => {
  it('should update a product', async () => {
    const productRepository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const result = await updateProductUseCase.execute(input);

    expect(result).toStrictEqual(input);
  });

  it("should throw when product doesn't exist", async () => {
    const productRepository = MockRepository();

    productRepository.find.mockImplementation(() => {
      throw new Error('Product not found');
    });

    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    expect(() => {
      return updateProductUseCase.execute(input);
    }).rejects.toThrow('Product not found');
  });
});
