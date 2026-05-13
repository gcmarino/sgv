import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaDB1Service } from '../shared/prisma/prisma-db1.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaDB1Service],
})
export class OrdersModule {}
