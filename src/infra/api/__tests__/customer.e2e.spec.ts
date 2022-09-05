import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E test for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John Doe',
        address: {
          street: 'Street 1',
          number: 123,
          city: 'City 1',
          state: 'State 1',
          zip: 'Zip 1',
        },
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('John Doe');
    expect(response.body.address.street).toBe('Street 1');
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.city).toBe('City 1');
    expect(response.body.address.state).toBe('State 1');
    expect(response.body.address.zip).toBe('Zip 1');
  });

  it('should not create a customer', async () => {
    const response = await request(app).post('/customer').send({
      name: 'John Doe',
    });

    expect(response.status).toBe(500);
  });

  it('should list all customers', async () => {
    await request(app)
      .post('/customer')
      .send({
        name: 'John Doe',
        address: {
          street: 'Street 1',
          number: 123,
          city: 'City 1',
          state: 'State 1',
          zip: 'Zip 1',
        },
      });

    await request(app)
      .post('/customer')
      .send({
        name: 'Jane Doe',
        address: {
          street: 'Street 1',
          number: 123,
          city: 'City 1',
          state: 'State 1',
          zip: 'Zip 1',
        },
      });

    const listResponse = await request(app).get('/customer');

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);
    expect(listResponse.body.customers[0].name).toBe('John Doe');
    expect(listResponse.body.customers[1].name).toBe('Jane Doe');

    const listResponseXML = await request(app).get('/customer').set('Accept', 'application/xml').send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
  });

  it("should find a customer by it's id", async () => {
    const customerCreated = await request(app)
      .post('/customer')
      .send({
        name: 'John Doe',
        address: {
          street: 'Street 1',
          number: 123,
          city: 'City 1',
          state: 'State 1',
          zip: 'Zip 1',
        },
      });

    const customerFindResult = await request(app).get(`/customer/${customerCreated.body.id}`);

    expect(customerFindResult.status).toBe(200);
    expect(customerFindResult.body.id).toBe(customerCreated.body.id);
    expect(customerFindResult.body.name).toBe('John Doe');
    expect(customerFindResult.body.address.street).toBe('Street 1');
    expect(customerFindResult.body.address.number).toBe(123);
    expect(customerFindResult.body.address.city).toBe('City 1');
    expect(customerFindResult.body.address.state).toBe('State 1');
    expect(customerFindResult.body.address.zip).toBe('Zip 1');
  });

  it("should not find a customer by it's id", async () => {
    const customerFindResult = await request(app).get(`/customer/${99999}`);

    expect(customerFindResult.status).toBe(500);
  });

  it('should update a customer', async () => {
    const customerCreated = await request(app)
      .post('/customer')
      .send({
        name: 'John Doe',
        address: {
          street: 'Street 1',
          number: 123,
          city: 'City 1',
          state: 'State 1',
          zip: 'Zip 1',
        },
      });

    const customerUpdated = await request(app)
      .patch(`/customer/${customerCreated.body.id}`)
      .send({
        name: "John Doe's wife",
        address: {
          state: "John Doe's wife's state",
          city: "John Doe's wife's city",
          street: "John Doe's wife's street",
          number: 12313,
          zip: "John Doe's wife's zip",
        },
      });

    expect(customerUpdated.status).toBe(200);
    expect(customerUpdated.body.id).toBe(customerCreated.body.id);
    expect(customerUpdated.body.name).toBe("John Doe's wife");
    expect(customerUpdated.body.address.street).toBe("John Doe's wife's street");
    expect(customerUpdated.body.address.number).toBe(12313);
    expect(customerUpdated.body.address.city).toBe("John Doe's wife's city");
    expect(customerUpdated.body.address.state).toBe("John Doe's wife's state");
    expect(customerUpdated.body.address.zip).toBe("John Doe's wife's zip");
  });

  it('should not update a customer', async () => {
    const customerUpdated = await request(app)
      .patch(`/customer/${9999}`)
      .send({
        name: "John Doe's wife",
        address: {
          state: "John Doe's wife's state",
          city: "John Doe's wife's city",
          street: "John Doe's wife's street",
          number: "John Doe's wife's number",
          zip: "John Doe's wife's zip",
        },
      });

    expect(customerUpdated.status).toBe(500);
  });

  it('should delete a customer', async () => {
    const customerCreated = await request(app)
      .post('/customer')
      .send({
        name: 'John Doe',
        address: {
          street: 'Street 1',
          number: 123,
          city: 'City 1',
          state: 'State 1',
          zip: 'Zip 1',
        },
      });

    await request(app).delete(`/customer/${customerCreated.body.id}`);

    const customerFindResult = await request(app).get(`/customer/${customerCreated.body.id}`);

    expect(customerFindResult.status).toBe(500);
  });
});
