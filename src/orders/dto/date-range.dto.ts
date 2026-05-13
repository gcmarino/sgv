import { IsDateString } from 'class-validator';

export class DateRangeDto {
  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;

  get startDateAsDate(): Date {
    return new Date(this.startDate);
  }

  get endDateAsDate(): Date {
    return new Date(this.endDate);
  }
}
