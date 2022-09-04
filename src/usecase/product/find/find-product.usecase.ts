import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { InputFindProductDTO, OutputFindProductDTO } from './find-product.dto';

export default class FindProductUseCase {
  private readonly productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputFindProductDTO): Promise<OutputFindProductDTO> {
    const { id } = input;

    const product = await this.productRepository.find(id);

    if (!product) {
      throw new Error('Product not found');
    }

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
