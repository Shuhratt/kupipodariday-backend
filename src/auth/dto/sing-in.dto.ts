import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class SigninDto {
  @ApiProperty({ minLength: 2, maxLength: 30 })
  @IsString()
  @Length(2, 30)
  username: string;

  @ApiProperty({ minLength: 6, maxLength: 100, format: 'password' })
  @IsString()
  @Length(6, 100)
  password: string;
}
