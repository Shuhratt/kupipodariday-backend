import { IsString, IsEmail, Length } from 'class-validator';

export class SigninDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 100)
  password: string;
}
