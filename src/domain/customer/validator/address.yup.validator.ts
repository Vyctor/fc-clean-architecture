import { ValidatorInterface } from '../../shared/validator/validator.interface';
import Customer from '../entity/customer';
import * as yup from 'yup';
import Address from '../value-object/address';

export class AddressYupValidator implements ValidatorInterface<Address> {
  validate(entity: Address): void {
    try {
      yup
        .object()
        .shape({
          street: yup.string().required('Street is required'),
          number: yup.number().required('Number is required'),
          city: yup.string().required('City is required'),
          state: yup.string().required('State is required'),
          zip: yup.string().required('Zip is required'),
        })
        .validateSync(
          {
            street: entity.street,
            number: entity.number,
            city: entity.city,
            state: entity.state,
            zip: entity.zip,
          },
          {
            abortEarly: false,
          },
        );
    } catch (errors) {
      const yupErrors = errors as yup.ValidationError;

      yupErrors.errors.forEach((error) => {
        entity.notification.addError({
          context: 'Address',
          message: error,
        });
      });
    }
  }
}
