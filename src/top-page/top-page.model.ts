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
