import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './services';

describe('OrdersController', () => {
  let _ordersController: OrdersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();

    _ordersController = app.get<OrdersController>(OrdersController);
  });

  describe('root', () => {
    // it('should return "Hello World!"', () => {
    //   expect(ordersController.getHello()).toBe('Hello World!');
    // });
  });
});
