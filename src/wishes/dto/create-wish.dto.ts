import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class CreateWishDto {
  @ApiProperty({ minLength: 1, maxLength: 50 })
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiProperty({ format: 'uri' })
  @IsUrl()
  link: string;

  @ApiProperty({ format: 'uri' })
  @IsUrl()
  image: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  raised?: number;

  @ApiProperty({ minLength: 1, maxLength: 1024 })
  @IsString()
  @Length(1, 1024)
  description: string;
}
