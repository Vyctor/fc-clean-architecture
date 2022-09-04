import { Sequelize } from 'sequelize-typescript';
import ProductRepository from '../../../infra/product/repository/sequelize/product-repository';
import ProductModel from '../../../infra/product/repository/sequelize/product.model';
import CreateProductUseCase from './create-product.usecase';

const input = {
  type: 'a',
  name: 'bike',
  price: 10,
};

const output = {
  id: expect.any(String),
  name: input.name,
  price: input.price,
};

describe('Integration test create product use case', () => {
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

  it('should create a product', async () => {
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const product = await createProductUseCase.execute(input);

    expect(product).toStrictEqual(output);
  });
});
