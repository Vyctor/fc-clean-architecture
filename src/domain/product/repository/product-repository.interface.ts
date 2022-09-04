import RepositoryInterface from '../../shared/repository/repository.interface';
import ProductInterface from '../entity/product.interface';

interface ProductRepositoryInterface extends RepositoryInterface<ProductInterface> {}

export default ProductRepositoryInterface;
