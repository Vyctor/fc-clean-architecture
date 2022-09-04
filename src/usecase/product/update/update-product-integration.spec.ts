import { Sequelize } from 'sequelize-typescript';
import ProductRepository from '../../../infra/product/repository/sequelize/product-repository';
import ProductModel from '../../../infra/product/repository/sequelize/product.model';
import { UpdateProductUseCase } from './update-product-usecase';
import ProductFactory from '../../../domain/product/factory/product.factory';
describe('Integration test update product use case', () => {
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

  it('should update a product', async () => {
    const productRepository = new ProductRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const product = ProductFactory.create('a', 'Product', 10);

    await productRepository.create(product);

    const input = {
      id: product.id,
      name: 'bike Updated',
      price: 4,
    };

    const result = await updateProductUseCase.execute(input);

    expect(result).toStrictEqual(input);
  });

  it('should throws if update an inexistent product', async () => {
    const productRepository = new ProductRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: 'any_id',
      name: 'bike Updated',
      price: 4,
    };

    expect(async () => {
      await updateProductUseCase.execute(input);
    }).rejects.toBeInstanceOf(Error);
  });
});
