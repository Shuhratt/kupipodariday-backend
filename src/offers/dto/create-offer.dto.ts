import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class CreateOfferDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsBoolean()
  hidden: boolean;

  @ApiProperty()
  @IsNumber()
  itemId: number;
}
