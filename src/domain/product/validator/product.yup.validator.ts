import { ValidatorInterface } from '../../shared/validator/validator.interface';
import * as yup from 'yup';
import Product from '../entity/product';

export class ProductYupValidator implements ValidatorInterface<Product> {
  validate(entity: Product): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          name: yup.string().required('Name is required'),
          price: yup.number().required('Price is required').positive('Price need to be greater than 0'),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
          },
          {
            abortEarly: false,
          },
        );
    } catch (errors) {
      const yupErrors = errors as yup.ValidationError;

      yupErrors.errors.forEach((error) => {
        entity.notification.addError({
          context: 'Product',
          message: error,
        });
      });
    }
  }
}
