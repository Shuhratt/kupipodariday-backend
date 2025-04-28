import { IsString, Length, IsUrl, IsOptional } from 'class-validator';
import { SigninDto } from './sing-in.dto';

export class SignupDto extends SigninDto {
  @IsString()
  @Length(2, 30)
  username: string;

  @IsOptional()
  @IsString()
  @Length(2, 200)
  about?: string;

  @IsOptional()
  @IsUrl()
  avatar?: string;
}
