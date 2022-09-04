import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { InputCreateProductDTO, OutputCreateProductDTO } from './create-product.dto';
import ProductFactory from '../../../domain/product/factory/product.factory';
export default class CreateProductUseCase {
  private readonly productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  public async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
    const { type, name, price } = input;

    const product = ProductFactory.create(type, name, price);

    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
