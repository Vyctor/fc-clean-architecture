import CreateProductUseCase from './create-product.usecase';
let input = {
  type: 'a',
  name: 'Product A',
  price: 10,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
};

describe('Unit test create product use case', () => {
  beforeEach(() => {
    input = {
      type: 'a',
      name: 'Product A',
      price: 10,
    };
  });
  it('should create a product', async () => {
    const customerRepository = MockRepository();
    const usecase = new CreateProductUseCase(customerRepository);

    const expectedOutput = {
      id: expect.any(String),
      name: input.name,
      price: input.price,
    };

    const useCaseResult = await usecase.execute(input);

    expect(useCaseResult).toStrictEqual(expectedOutput);
  });
});
