import { Router, Request, Response } from 'express';
import CreateCustomerUseCase from '../../../usecase/customer/create/create-customer.usecase';
import CustomerRepository from '../../customer/repository/sequelize/customer-repository';
import ListCustomerUseCase from '../../../usecase/customer/list/list-customer.usecase';
import FindCustomerUseCase from '../../../usecase/customer/find/find-customer.usecase';
import UpdateCustomerUseCase from '../../../usecase/customer/update/update-customer.usecase';
import DeleteCustomerUseCase from '../../../usecase/customer/delete/delete-customer.usecase';
import { CustomerPresenter } from '../presenters/customer.presenter';

export const customerRoute = Router();

customerRoute.post('/', async (request: Request, response: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());

  try {
    const customerDto = {
      name: request.body.name,
      address: {
        street: request.body.address.street,
        number: request.body.address.number,
        city: request.body.address.city,
        state: request.body.address.state,
        zip: request.body.address.zip,
      },
    };

    const customer = await usecase.execute(customerDto);

    return response.status(201).send(customer);
  } catch (error) {
    return response.status(500).send(error);
  }
});

customerRoute.get('/', async (request: Request, response: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());

  try {
    const output = await usecase.execute();

    response.format({
      json: async () => response.status(200).send(output),
      xml: async () => response.status(200).send(CustomerPresenter.toXML(output)),
    });
  } catch (error) {
    return response.status(500).send(error);
  }
});

customerRoute.get('/:id', async (request: Request, response: Response) => {
  const usecase = new FindCustomerUseCase(new CustomerRepository());

  const { id } = request.params;

  try {
    const customer = await usecase.execute({ id });

    return response.status(200).send(customer);
  } catch (error) {
    return response.status(500).send(error);
  }
});

customerRoute.patch('/:id', async (request: Request, response: Response) => {
  const usecase = new UpdateCustomerUseCase(new CustomerRepository());

  try {
    const updateCustomerDto = {
      id: request.params.id as string,
      name: request.body.name,
      address: {
        street: request.body.address.street,
        number: request.body.address.number,
        city: request.body.address.city,
        state: request.body.address.state,
        zip: request.body.address.zip,
      },
    };

    const customer = await usecase.execute(updateCustomerDto);

    return response.status(200).send(customer);
  } catch (error) {
    return response.status(500).send(error);
  }
});

customerRoute.delete('/:id', async (request: Request, response: Response) => {
  const usecase = new DeleteCustomerUseCase(new CustomerRepository());

  const { id } = request.params;

  try {
    await usecase.execute({ id });

    return response.status(204).send();
  } catch (error) {
    return response.status(500).send(error);
  }
});
