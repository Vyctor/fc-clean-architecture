import { Router, Request, Response } from 'express';
import CreateProductUseCase from '../../../usecase/product/create/create-product.usecase';
import ProductRepository from '../../product/repository/sequelize/product-repository';
import ListProductUseCase from '../../../usecase/product/list/list-product.usecase';
import FindProductUseCase from '../../../usecase/product/find/find-product.usecase';
import { UpdateProductUseCase } from '../../../usecase/product/update/update-product-usecase';
import DeleteProductUseCase from '../../../usecase/product/delete/delete-product.usecase';

export const productRoute = Router();

productRoute.post('/', async (request: Request, response: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());

  try {
    const productDto = {
      type: request.body.type,
      name: request.body.name,
      price: request.body.price,
    };

    const product = await usecase.execute(productDto);

    return response.status(201).send(product);
  } catch (error) {
    return response.status(500).send(error);
  }
});

productRoute.get('/', async (request: Request, response: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());

  try {
    const products = await usecase.execute();

    return response.status(200).send(products);
  } catch (error) {
    return response.status(500).send(error);
  }
});

productRoute.get('/:id', async (request: Request, response: Response) => {
  const usecase = new FindProductUseCase(new ProductRepository());

  try {
    const { id } = request.params;
    const product = await usecase.execute({ id });

    return response.status(200).send(product);
  } catch (error) {
    return response.status(500).send(error);
  }
});

productRoute.patch('/:id', async (request: Request, response: Response) => {
  const usecase = new UpdateProductUseCase(new ProductRepository());

  try {
    const updateProductDto = {
      id: request.params.id,
      name: request.body.name,
      price: request.body.price,
    };

    const product = await usecase.execute(updateProductDto);

    return response.status(200).send(product);
  } catch (error) {
    return response.status(500).send(error);
  }
});

productRoute.delete('/:id', async (request: Request, response: Response) => {
  const usecase = new DeleteProductUseCase(new ProductRepository());

  try {
    const updateProductDto = {
      id: request.params.id,
    };

    const product = await usecase.execute(updateProductDto);

    return response.status(200).send(product);
  } catch (error) {
    return response.status(500).send(error);
  }
});
