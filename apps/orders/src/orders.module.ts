import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './services';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.getOrThrow('DATABASE_HOST'),
          port: configService.getOrThrow('DATABASE_PORT'),
          username: configService.getOrThrow('DATABASE_USER'),
          password: configService.getOrThrow('DATABASE_PASSWORD'),
          database: configService.getOrThrow('DATABASE_DB'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: configService.getOrThrow('DATABASE_SYNCHRONIZE'),
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
