import { IsString, Length, IsUrl, IsOptional, IsEmail } from 'class-validator';
import { SigninDto } from './sing-in.dto';

export class SignupDto extends SigninDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Length(2, 200)
  about?: string;

  @IsOptional()
  @IsUrl()
  avatar?: string;
}
