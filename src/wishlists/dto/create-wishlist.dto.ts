import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateWishlistDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ format: 'uri' })
  @IsUrl()
  image: string;

  @ApiProperty({ type: () => ['number'] })
  @IsArray()
  @IsNotEmpty()
  itemsId: number[];
}
