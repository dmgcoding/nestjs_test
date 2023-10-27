import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  title: string;
  @IsString()
  @IsOptional()
  desc: string;
  @IsNumber()
  ownerId: number;
}
