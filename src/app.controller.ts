import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from './shared/prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('RABBITMQ_CLIENT') private readonly rmqClient: ClientProxy,
  ) {}

  @Get()
  async getHello() {
    const order = await this.prisma.orders.findFirst({
      include: {
        OrderItems: true,
      },
    });
    return order;
  }

  @Post('insert-sale')
  insertSale(@Body() payload: Record<string, unknown> = {}) {
    console.log('[AppController] Emitting to queue:', process.env.RABBITMQ_QUEUE, payload);
    this.rmqClient.emit(process.env.RABBITMQ_QUEUE!, payload ?? {});
    return { queued: true };
  }
}
