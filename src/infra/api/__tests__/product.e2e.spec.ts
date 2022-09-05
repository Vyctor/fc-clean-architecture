import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E test for product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const response = await request(app).post('/product').send({
      type: 'a',
      name: 'Product',
      price: 10,
    });

    expect(response.status).toBe(201);
  });

  it('should not create a customer if incorrect type is given', async () => {
    const response = await request(app).post('/product').send({
      type: 'ggg',
      name: 'Product',
      price: 10,
    });

    expect(response.status).toBe(500);
  });

  it('should not create a customer if negative price is given', async () => {
    const response = await request(app).post('/product').send({
      type: 'a',
      name: 'Product',
      price: -10,
    });

    expect(response.status).toBe(500);
  });

  it('should not create a customer if no price is given', async () => {
    const response = await request(app).post('/product').send({
      type: 'a',
      name: 'Product',
      price: 0,
    });

    expect(response.status).toBe(500);
  });

  it('should list all products', async () => {
    await request(app).post('/product').send({
      type: 'a',
      name: 'Product',
      price: 10,
    });

    await request(app).post('/product').send({
      type: 'a',
      name: 'Product B',
      price: 100,
    });

    const listResponse = await request(app).get('/product');

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    expect(listResponse.body.products[0].name).toBe('Product');
    expect(listResponse.body.products[1].name).toBe('Product B');
    expect(listResponse.body.products[0].price).toBe(10);
    expect(listResponse.body.products[1].price).toBe(100);
  });

  it("should find a product by it's id", async () => {
    const productCreated = await request(app).post('/product').send({
      type: 'a',
      name: 'Product B',
      price: 100,
    });

    const productFindResult = await request(app).get(`/product/${productCreated.body.id}`);

    expect(productFindResult.status).toBe(200);
    expect(productFindResult.body.id).toBe(productCreated.body.id);
    expect(productFindResult.body.name).toBe('Product B');
    expect(productFindResult.body.price).toBe(100);
  });

  it("should not find a product by it's id", async () => {
    const productFindResult = await request(app).get(`/product/${99999}`);

    expect(productFindResult.status).toBe(500);
  });

  it('should update a product', async () => {
    const productCreated = await request(app).post('/product').send({
      type: 'a',
      name: 'Product B',
      price: 100,
    });

    const productUpdated = await request(app).patch(`/product/${productCreated.body.id}`).send({
      name: 'Product C',
      price: 200,
    });

    expect(productUpdated.status).toBe(200);
    expect(productUpdated.body.id).toBe(productCreated.body.id);
    expect(productUpdated.body.name).toBe('Product C');
    expect(productUpdated.body.price).toBe(200);
  });

  it('should not update a product', async () => {
    const productUpdated = await request(app).patch(`/product/${9999}`).send({
      id: 9999,
      name: 'Product C',
      price: 200,
    });

    expect(productUpdated.status).toBe(500);
  });

  it('should delete a product', async () => {
    const productCreated = await request(app).post('/product').send({
      type: 'a',
      name: 'Product B',
      price: 100,
    });

    await request(app).delete(`/product/${productCreated.body.id}`);

    const productFindResult = await request(app).get(`/product/${productCreated.body.id}`);

    expect(productFindResult.status).toBe(500);
  });
});
