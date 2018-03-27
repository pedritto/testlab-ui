import { Category } from './category'

export interface TestCaseExecution {
  id: string,
  number: string,
  name: string,
  description: string,
  category: Category,
  lastModified: Date,
  testResult: string
}
