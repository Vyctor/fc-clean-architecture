import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { OutputListProductDTO } from './list-product.dto';
import ProductInterface from '../../../domain/product/entity/product.interface';

export default class ListProductUseCase {
  private readonly productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(): Promise<any> {
    const products = await this.productRepository.findAll();

    return OutputMapper.toOutput(products);
  }
}

class OutputMapper {
  static toOutput(product: ProductInterface[]): OutputListProductDTO {
    return {
      products: product.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
