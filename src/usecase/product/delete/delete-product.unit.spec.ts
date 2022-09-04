import ProductFactory from '../../../domain/product/factory/product.factory';
import DeleteProductUseCase from './delete-product.usecase';

const product = ProductFactory.create('a', 'Product', 10);

let input = {
  id: product.id,
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

describe('Unit test for delete product usecase', () => {
  it('should delete a product', async () => {
    const productRepository = MockRepository();
    const usecase = new DeleteProductUseCase(productRepository);

    await usecase.execute(input);

    expect(productRepository.delete).toHaveBeenCalledWith(input.id);
  });
});
