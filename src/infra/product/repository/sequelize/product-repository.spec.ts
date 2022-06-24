import Product from '../../../../domain/product/entity/product';
import ProductModel from './product.model';

import ProductRepository from './product-repository';
import { Sequelize } from 'sequelize-typescript';

let sequelize: Sequelize;

describe('Product repository test', () => {
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
    const product = new Product('1', 'Product 1', 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 1',
      price: 100,
    });
  });

  it('should update a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 1',
      price: 100,
    });

    product.changeName('Product 2');
    product.changePrice(200);

    await productRepository.update(product);

    const productModelUpdated = await ProductModel.findOne({ where: { id: '1' } });

    expect(productModelUpdated.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 2',
      price: 200,
    });
  });

  it('should find a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: 1 } });
    const foundProduct = await productRepository.find('1');

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });

  it('should find all products', async () => {
    const productRepository = new ProductRepository();

    const productA = new Product('1', 'Product 1', 100);
    const productB = new Product('2', 'Product 2', 200);
    const productC = new Product('3', 'Product 3', 300);
    const productD = new Product('4', 'Product 4', 400);

    const products = [productA, productB, productC, productD];

    await Promise.all(products.map((product) => productRepository.create(product)));

    const foundProducts = await productRepository.findAll();

    expect(products).toBeDefined();
    expect(products.length).toEqual(foundProducts.length);
    expect(products).toEqual(foundProducts);
  });
});
