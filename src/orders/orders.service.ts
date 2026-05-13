import { Injectable } from '@nestjs/common';
import { PrismaDB1Service } from '../shared/prisma/prisma-db1.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaDB1Service) {}

  findByDateRange(startDate: Date, endDate: Date) {
    return this.prisma.orders.findMany({
      where: {
        CreatedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
  }
}
