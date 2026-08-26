import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  customerId: string;

  @IsNumber()
  amount: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  items: ProductDto[];
}

class ProductDto {
  @IsUUID()
  productId: string;

  @IsNumber()
  @Min(0)
  quantity: number;
}
