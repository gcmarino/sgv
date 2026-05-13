import { Controller, Get, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { DateRangeDto } from './dto/date-range.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getByDateRange(@Query() query: DateRangeDto) {
    return this.ordersService.findByDateRange(
      query.startDateAsDate,
      query.endDateAsDate,
    );
  }
}
