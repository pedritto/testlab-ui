import { Category } from './category'

export interface TestCase {
  id: string,
  number: string,
  name: string,
  description: string,
  category: Category
}
