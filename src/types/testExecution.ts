import { Environment } from './environment';
import { TestCaseExecution } from './testCaseExecution';

export interface TestExecution {
  id: string
  name: string
  environment: Environment
  testCaseExecutions: TestCaseExecution[]
  created: Date
}
