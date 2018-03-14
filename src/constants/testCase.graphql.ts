import gql from 'graphql-tag'

import { TestCase } from '../types/testCase';

export const ALL_TEST_CASES_QUERY = gql`
  query TestCasesQuery {
    findAllTestCases {
      id
      number
      name
      description
      category {
        id
        name
      }
    }
  }
`;

export const FILTERED_TEST_CASES_QUERY = gql`
  query TestCasesQuery($filter: TestCaseFilter!) {
    filterTestCases(filter: $filter) {
      id
      number
      name
      description
      category {
        id
        name
      }
    }
  }
`;

export const DELETE_TEST_CASES_MUTATION = gql`
  mutation DeleteTestCaseMutation($id: ID!) {
    deleteTestCase(id: $id)
  }
`;

export const UPDATE_TEST_CASES_MUTATION = gql`
  mutation UpdateTestCase($id: ID!, $number: String!, $name: String!, $description: String!, $category: ID!) {
    updateTestCase(id: $id, number: $number, name: $name, description: $description, category: $category) {
      id
    }
  }
`;

export interface AllResultsQueryResponse {
  getTestResultValues: string[];
}

export interface AllTestCasesQueryResponse {
  findAllTestCases: TestCase[];
}
