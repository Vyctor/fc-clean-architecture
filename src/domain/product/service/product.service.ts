import Product from '../entity/product';

export default class ProductService {
  public static increasePrice(products: Product[], percentage: number): Product[] {
    return products.map((product) => {
      const newPrice = product.price + (product.price * percentage) / 100;

      product.changePrice(newPrice);

      return product;
    });
  }
}
