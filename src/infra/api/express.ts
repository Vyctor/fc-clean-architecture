import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../customer/repository/sequelize/customer.model';
import ProductModel from '../product/repository/sequelize/product.model';
import { customerRoute } from './routes/customer.route';

export const app: Express = express();
export let sequelize: Sequelize;

app.use(express.json());
app.use('/customer', customerRoute);

async function setupDatabase(): Promise<void> {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });
  sequelize.addModels([CustomerModel, ProductModel]);
  await sequelize.sync();
}

setupDatabase();
