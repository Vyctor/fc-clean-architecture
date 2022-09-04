import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infra/product/repository/sequelize/product.model';
import ProductRepository from '../../../infra/product/repository/sequelize/product-repository';
import DeleteProductUseCase from './delete-product.usecase';
import ProductFactory from '../../../domain/product/factory/product.factory';

describe('Integration test delete product use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should delete a product', async () => {
    const productRepository = new ProductRepository();
    const deleteProductUseCase = new DeleteProductUseCase(productRepository);

    const product = ProductFactory.create('a', 'Product', 10);

    await productRepository.create(product);

    await deleteProductUseCase.execute({ id: product.id });

    expect(async () => await productRepository.find(product.id)).rejects.toThrowError();
  });
});
