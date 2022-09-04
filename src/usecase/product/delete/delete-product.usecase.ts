import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { InputDeleteProductDTO } from './delete-product.dto';

export default class DeleteProductUseCase {
  private readonly productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputDeleteProductDTO): Promise<void> {
    await this.productRepository.delete(input.id);
  }
}
