import Product from '../../../../domain/product/entity/product';
import ProductRepositoryInterface from '../../../../domain/product/repository/product-repository.interface';
import ProductModel from './product.model';
import ProductInterface from '../../../../domain/product/entity/product.interface';

class ProductRepository implements ProductRepositoryInterface {
  async create(entity: ProductInterface): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async update(entity: ProductInterface): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: {
          id: entity.id,
        },
      },
    );
  }

  async delete(id: string): Promise<void> {
    await ProductModel.destroy({
      where: {
        id,
      },
    });
  }

  async find(id: string): Promise<Product> {
    const product = await ProductModel.findOne({ where: { id } });

    return new Product(product.id, product.name, product.price);
  }

  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();

    return products.map((productModel) => new Product(productModel.id, productModel.name, productModel.price));
  }
}

export default ProductRepository;
