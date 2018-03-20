import gql from 'graphql-tag'

import { TestCase } from '../types/testCase';

const TEST_CASE_STRUCTURE = `
  id
  number
  name
  description
  category {
    id
    name
  }
`;

export const ALL_TEST_CASES_QUERY = gql`
  query TestCasesQuery {
    findAllTestCases {
      ${TEST_CASE_STRUCTURE}
    }
  }
`;

export const FILTERED_TEST_CASES_QUERY = gql`
  query TestCasesQuery($filter: TestCaseFilter!) {
    filterTestCases(filter: $filter) {
      ${TEST_CASE_STRUCTURE}
    }
  }
`;

export const CREATE_TEST_CASES_MUTATION = gql`
  mutation CreateTestCase($name: String!, $description: String!, $categoryId: ID!) {
    newTestCase(name: $name, description: $description, categoryId: $categoryId) {
      ${TEST_CASE_STRUCTURE}
    }
  }
`;

export const DELETE_TEST_CASES_MUTATION = gql`
  mutation DeleteTestCaseMutation($id: ID!) {
    deleteTestCase(id: $id)
  }
`;

export const UPDATE_TEST_CASES_MUTATION = gql`
  mutation UpdateTestCase($id: ID!, $name: String!, $description: String!, $categoryId: ID!) {
    updateTestCase(id: $id, name: $name, description: $description, categoryId: $categoryId) {
      ${TEST_CASE_STRUCTURE}
    }
  }
`;


export interface AllTestCasesQueryResponse {
  findAllTestCases: TestCase[];
}
