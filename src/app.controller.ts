import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('RABBITMQ_CLIENT') private readonly rmqClient: ClientProxy,
  ) {}


  @Post('insert-sale')
  insertSale(@Body() payload: Record<string, unknown> = {}) {
    console.log('[AppController] Emitting to queue:', process.env.RABBITMQ_QUEUE, payload);
    this.rmqClient.emit(process.env.RABBITMQ_QUEUE!, payload ?? {});
    return { queued: true };
  }
}
