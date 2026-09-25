import { NestFactory } from '@nestjs/core';
import { InventoryModule } from './inventory.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    InventoryModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: { clientId: 'inventory', brokers: [process.env.KAFKA_BROKER] },
        consumer: { groupId: 'inventory-consumer' },
      },
    },
  );
  await app.listen();
}
bootstrap().catch((err) => {
  console.error('Failed to start inventory service', err);
  process.exit(1);
});
