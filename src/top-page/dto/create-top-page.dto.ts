import { IsArray, IsEnum, IsNumber, IsString, ValidateNested } from "class-validator"
import { Type } from "class-transformer"

export enum TopLevelCategory {
  Cources,
  Services,
  Books,
  Products
}

export class HHData {
  @IsNumber()
  count: number

  @IsNumber()
  juniorSalary: number

  @IsNumber()
  middleSalary: number

  @IsNumber()
  seniorSalary: number
}

export class AdvantagesData {
  @IsString()
  title: string

  @IsString()
  description: string
}

export class CreateTopPageDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory

  @IsString()
  secondCategory: string

  @IsString()
  alias: string

  @IsString()
  title: string

  @IsString()
  category: string

  @ValidateNested()
  @Type(() => HHData)
  hh?: HHData

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AdvantagesData )
  advantages: AdvantagesData[]

  @IsString()
  seoText: string

  @IsString()
  tagsTitle: string

  @IsArray()
  @IsString({ each: true })
  tags: string[]
}
