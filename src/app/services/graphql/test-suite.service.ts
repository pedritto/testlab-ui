import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';

import { TestSuiteInput } from  'types/testSuiteInput';

const TEST_SUITE_STRUCTURE = `
  id
  name
  testCases {
    id
    number
    name
    category {
      id
      name
    }
  }
`;

@Injectable()
export class TestSuiteService {

  constructor(private apollo: Apollo) {
  }

  fetchTestSuites() {
    return this.apollo
      .watchQuery({
        query: gql`
          query TestSuitesQuery {
            findAllTestSuites {
              ${TEST_SUITE_STRUCTURE}
            }
          }`,
        fetchPolicy: 'network-only'
      })
      .valueChanges
      .map((response: any) => response.data.findAllTestSuites);
  }

  getTestSuite(id: string) {
    return this.apollo
      .watchQuery({
        query: gql`
          query TesSuiteQuery($id: ID!) {
            findTestSuite(id: $id) {
              ${TEST_SUITE_STRUCTURE}
            }
          }`,
        variables: { id },
      })
      .valueChanges
      .map((response: any) => response.data.findTestSuite);
  }

  deleteTestSuite(id: string) {
    return this.apollo.mutate({
      mutation: gql`
         mutation DeleteTestSuiteeMutation($id: ID!) {
            deleteTestSuite(id: $id)
          }
         `,
      variables: { id },
    });
  }

  createTestSuite(input: TestSuiteInput) {
    return this.apollo.mutate({
      mutation: gql`
         mutation CreateTestSuite($input: TestSuiteInput!) {
          newTestSuite(input: $input) {
              ${TEST_SUITE_STRUCTURE}
            }
          }`,
      variables: {
        input
      }
    })
      .map((response: any) => response.data.newTestSuite);
  }

  updateTestSuite(id: string, input: TestSuiteInput) {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateTestSuite($id: ID!, $input: TestSuiteInput!) {
          updateTestSuite(id: $id, input: $input) {
            ${TEST_SUITE_STRUCTURE}
          }
        }`,
      variables: {
        id,
        input
      }
    })
      .map((response: any) => response.data.updateTestCase);
  }

  // @TODO: implement on server side
  filterTestSuites(filter) {
    return this.fetchTestSuites();
  }

}
