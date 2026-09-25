import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { OutboxMessageStatus } from '../enums';
import { Topic } from '@libs/contracts';

@Entity('outbox')
export class Outbox {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'string' })
  topic: Topic;

  @Column()
  correlationId: string;

  @Column('jsonb')
  payload: unknown;

  @Column({ default: OutboxMessageStatus.PENDING })
  status: OutboxMessageStatus;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  sentAt: Date | null;
}
