import ProductFactory from '../../../domain/product/factory/product.factory';
import FindProductUseCase from './find-product.usecase';

const product = ProductFactory.create('a', 'Product', 10);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
};

describe('Unit test find product use case', () => {
  it('should find a product', async () => {
    const productRepository = MockRepository();
    const usecase = new FindProductUseCase(productRepository);

    await productRepository.create(product);

    const input = {
      id: '1',
    };

    const expectedOutput = {
      id: product.id,
      name: product.name,
      price: product.price,
    };

    const useCaseResult = await usecase.execute(input);

    expect(useCaseResult).toStrictEqual(expectedOutput);
  });

  it('should throw when not find a customer', async () => {
    const productRepository = MockRepository();

    productRepository.find.mockImplementation(() => {
      throw new Error('Product not found');
    });

    const usecase = new FindProductUseCase(productRepository);

    await productRepository.create(product);

    const input = {
      id: '1',
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow('Product not found');
  });
});
