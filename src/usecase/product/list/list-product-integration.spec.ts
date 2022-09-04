import { Sequelize } from 'sequelize-typescript';
import ProductRepository from '../../../infra/product/repository/sequelize/product-repository';
import ProductModel from '../../../infra/product/repository/sequelize/product.model';
import ProductFactory from '../../../domain/product/factory/product.factory';
import ListProductUseCase from './list-product.usecase';

describe('Integration test list products use case', () => {
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

  it('should list all products', async () => {
    const productRepository = new ProductRepository();
    const listProductsUseCase = new ListProductUseCase(productRepository);

    const productOne = ProductFactory.create('a', 'Product One', 10);
    const productTwo = ProductFactory.create('a', 'Product Two', 10);

    await productRepository.create(productOne);
    await productRepository.create(productTwo);

    const result = await listProductsUseCase.execute();

    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe(productOne.id);
    expect(result.products[0].name).toBe(productOne.name);
    expect(result.products[0].price).toBe(productOne.price);
    expect(result.products[1].id).toBe(productTwo.id);
    expect(result.products[1].name).toBe(productTwo.name);
    expect(result.products[1].price).toBe(productTwo.price);
  });
});
