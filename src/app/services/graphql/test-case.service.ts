import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';

import { TestCaseInput } from 'types/testCaseInput';

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

@Injectable()
export class TestCaseService {

  constructor(private apollo: Apollo) {

  }

  fetchTestCases() {
    return this.apollo
      .watchQuery({
        query: gql`
          query TestCasesQuery {
            findAllTestCases {
              ${TEST_CASE_STRUCTURE}
            }
          }`,
        fetchPolicy: 'network-only'
      })
      .valueChanges
      .map((response: any) => response.data.findAllTestCases);
  }

  getTestCase(id: string) {
    return this.apollo
      .watchQuery({
        query: gql`
          query TestCaseQuery($id: ID!) {
            findTestCase(id: $id) {
              ${TEST_CASE_STRUCTURE}
            }
          }`,
        variables: { id },
      })
      .valueChanges
      .map((response: any) => response.data.findTestCase);
  }

  filterTestCases(filter) {
    return this.apollo
      .watchQuery({
        query: gql`
          query TestCasesQuery($filter: TestCaseFilter!) {
            filterTestCases(filter: $filter) {
              ${TEST_CASE_STRUCTURE}
            }
          }`,
        variables: { filter },
        fetchPolicy: 'network-only'
      })
      .valueChanges
      .map((response: any) => response.data.filterTestCases);
  }

  createTestCase(input: TestCaseInput) {
    return this.apollo.mutate({
      mutation: gql`
         mutation CreateTestCase($input: TestCaseInput!) {
          newTestCase(input: $input) {
              ${TEST_CASE_STRUCTURE}
            }
          }`,
         variables: {
           input
         }
      })
      .map((response: any) => response.data.newTestCase);
  }

  deleteTestCase(id: string) {
    return this.apollo.mutate({
      mutation: gql`
         mutation DeleteTestCaseMutation($id: ID!) {
            deleteTestCase(id: $id)
          }
         `,
      variables: { id },
    });
  }

  updateTestCase(id: string, input: TestCaseInput) {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateTestCase($id: ID!, $input: TestCaseInput!) {
          updateTestCase(id: $id, input: $input) {
            ${TEST_CASE_STRUCTURE}
          }
        }`,
        variables: {
          id,
          input
        }
      })
      .map((response: any) => response.data.updateTestCase);
  }

}
