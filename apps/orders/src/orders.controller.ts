import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { OrdersService } from './services/';
import { CreateOrderDto } from './order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(dto);
  }
}
