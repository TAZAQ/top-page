export enum TopLevelCategory {
  Cources,
  Services,
  Books,
  Products
}

interface Ihh {
  count: number;
  juniorSalary: number;
  middleSalary: number;
  seniorSalary: number;
}

interface IAdvantages {
  title: string;
  description: string;
}

export class TopPageModel {
  _id: string
  firstCategory: TopLevelCategory
  secondCategory: string
  title: string
  category: string
  hh?: Ihh
  advantages: IAdvantages[]
  seoText: string
  tags: string[]
  tagsTitle: string
}
