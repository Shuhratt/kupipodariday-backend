import { IsString, Length, IsUrl, IsOptional, IsEmail } from 'class-validator';
import { SigninDto } from './sing-in.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto extends SigninDto {
  @ApiProperty({ format: 'email', example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 2, maxLength: 200 })
  @IsOptional()
  @IsString()
  @Length(2, 200)
  about?: string;

  @ApiProperty({ format: 'uri', example: 'https://example.com/avatar' })
  @IsOptional()
  @IsUrl()
  avatar?: string;
}
