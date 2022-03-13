import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"
import { Type } from "class-transformer"

class ProductCharacteristicDto {
  @IsString()
  name: string

  @IsString()
  value: string
}

export class CreateProductDto {

  @IsString()
  image: string

  @IsString()
  title: string

  @IsNumber()
  price: number

  @IsOptional()
  @IsNumber()
  oldPrice?: number

  @IsNumber()
  credit: number

  @IsNumber()
  calculatedRating: number

  @IsString()
  description: string

  @IsString()
  advantages: string

  @IsString()
  disAdvantages: string

  @IsArray()
  @IsString({ each: true }) // каждый элемент внутри массива - string
  categories: string[]

  @IsArray()
  @IsString({ each: true })
  tags: string[]

  @IsArray()
  @ValidateNested()
  @Type(() => ProductCharacteristicDto) // т.к. это кастомный тип, то надо указать его через декоратор
  characteristics: ProductCharacteristicDto[]
}
