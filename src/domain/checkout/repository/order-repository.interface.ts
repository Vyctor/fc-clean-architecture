import RepositoryInterface from '../../shared/repository/repository.interface';
import Order from '../entity/order';

interface OrderRepositoryInterface extends RepositoryInterface<Order> {}

export default OrderRepositoryInterface;
