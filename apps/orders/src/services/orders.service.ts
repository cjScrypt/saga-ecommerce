import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Topic } from '@libs/contracts';
import { withTransaction } from '@libs/messaging';

import { Order, Outbox } from '../entities';
import { OutboxMessageStatus, SagaState } from '../enums';
import { CreateOrderDto } from '../order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly dataSource: DataSource) {}

  async createOrder(dto: CreateOrderDto) {
    const orderId = uuidv4();
    const result = await withTransaction(this.dataSource, async (manager) => {
      await manager.save(
        manager.create(Order, {
          id: orderId,
          customerId: dto.customerId,
          items: dto.items,
          amount: dto.amount,
          sagaState: SagaState.PENDING,
        }),
      );

      await manager.save([
        manager.create(Outbox, {
          id: uuidv4(),
          topic: Topic.ORDER_CREATED,
          correlationId: orderId,
          payload: {
            orderId,
            customerId: dto.customerId,
            items: dto.items,
            amount: dto.amount,
          },
        }),
        manager.create(Outbox, {
          id: uuidv4(),
          topic: Topic.INVENTORY_RESERVE,
          correlationId: orderId,
          payload: { orderId, items: dto.items },
        }),
      ]);

      return { orderId, status: OutboxMessageStatus.PENDING };
    });

    return result;
  }
}
