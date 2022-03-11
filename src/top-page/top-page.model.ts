import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"
import { prop } from "@typegoose/typegoose"

export enum TopLevelCategory {
  Cources,
  Services,
  Books,
  Products
}

export class HHData {
  @prop()
  count: number

  @prop()
  juniorSalary: number

  @prop()
  middleSalary: number

  @prop()
  seniorSalary: number
}

export class AdvantagesData {
  title: string
  description: string
}

export interface TopPageModel extends Base {}
export class TopPageModel extends TimeStamps{
  @prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory

  @prop()
  secondCategory: string

  @prop({ unique: true })
  alias: string

  @prop()
  title: string

  @prop()
  category: string

  @prop({ type: () => HHData })
  hh?: HHData

  @prop({ type: () => [AdvantagesData] })
  advantages: AdvantagesData[]

  @prop()
  seoText: string

  @prop()
  tagsTitle: string

  @prop({ type: () => [String] })
  tags: string[]
}
