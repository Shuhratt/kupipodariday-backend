import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  query: string;
}
