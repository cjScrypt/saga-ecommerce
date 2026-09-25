import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { OrdersModule } from './orders.module';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: { clientId: 'orders', brokers: [process.env.KAFKA_BROKER] },
      consumer: { groupId: 'orders-consumer' },
    },
  });

  await app.startAllMicroservices();

  await app.listen(process.env.APP_PORT);
}

bootstrap().catch((err) => {
  console.error('Failed to start order service', err);
  process.exit(1);
});
