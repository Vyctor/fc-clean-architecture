import Product from '../entity/product';
import RepositoryInterface from '../../shared/repository/repository.interface';

interface ProductRepositoryInterface extends RepositoryInterface<Product> {}

export default ProductRepositoryInterface;
