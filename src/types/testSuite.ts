import { TestCase } from './testCase';

export interface TestSuit {
  id: string,
  name: string,
  testCases: [TestCase]
}
