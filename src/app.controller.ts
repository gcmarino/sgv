import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './shared/prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly prisma: PrismaService) {}

  @Get()
  async getHello() {
    const order = await this.prisma.orders.findFirst();
    return order;
  }
}
