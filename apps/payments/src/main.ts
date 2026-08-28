import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentsModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: { clientId: 'payment', brokers: [process.env.KAFKA_BROKER] },
        consumer: { groupId: 'payment-consumer' },
      },
    },
  );
  await app.listen();
}

bootstrap().catch((err) => {
  console.error('Failed to start Payment service', err);
  process.exit(1);
});
