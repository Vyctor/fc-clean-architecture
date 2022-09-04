import { Sequelize } from 'sequelize-typescript';
import ProductRepository from '../../../infra/product/repository/sequelize/product-repository';
import ProductModel from '../../../infra/product/repository/sequelize/product.model';
import ProductFactory from '../../../domain/product/factory/product.factory';
import FindProductUseCase from './find-product.usecase';

describe('Integration test find product use case', () => {
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

  it('should find an product', async () => {
    const productRepository = new ProductRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);

    const product = ProductFactory.create('a', 'Product One', 10);

    await productRepository.create(product);

    const result = await findProductUseCase.execute({ id: product.id });

    expect(result.id).toBe(product.id);
    expect(result.name).toBe(product.name);
    expect(result.price).toBe(product.price);
  });

  it('should throws when not find an product', async () => {
    const productRepository = new ProductRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);

    expect(async () => {
      await findProductUseCase.execute({ id: '123' });
    }).rejects.toThrowError();
  });
});
