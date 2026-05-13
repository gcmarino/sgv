import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

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
