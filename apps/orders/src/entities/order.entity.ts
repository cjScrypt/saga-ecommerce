import { Column, Entity, PrimaryColumn } from 'typeorm';
import { SagaState } from '../enums';
import { Product } from '@libs/contracts';

@Entity('orders')
export class Order {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  customerId: string;

  @Column('jsonb')
  items: Product[];

  @Column('int')
  amount: number;

  @Column({ type: 'string', default: SagaState.PENDING })
  sagaState: SagaState;
}
