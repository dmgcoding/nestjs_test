import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  name: string;
  @IsString()
  storeName: string;
  @IsString()
  password: string;
}
