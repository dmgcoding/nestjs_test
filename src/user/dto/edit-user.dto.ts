import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsEmail()
  @IsOptional()
  username: string;
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  storeName: string;
}
