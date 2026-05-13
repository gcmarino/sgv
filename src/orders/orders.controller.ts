import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class OrdersController  {
  constructor(private readonly ordersService: OrdersService) {}

  @EventPattern("insert_sale")
  async insertSale(@Payload() sale: any) {
    console.log("[OrdersController] Received sale:", sale);
    // Here you would typically call a method on the ordersService to handle the sale
    // For example: await this.ordersService.insertSale(sale);
  }


}
