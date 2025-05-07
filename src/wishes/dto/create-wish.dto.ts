import { IsNumber, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class CreateWishDto {
  @IsString()
  @Length(1, 50)
  name: string;

  @IsUrl()
  link: string;

  @IsUrl()
  image: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  raised?: number;

  @IsString()
  @Length(1, 1024)
  description: string;
}
