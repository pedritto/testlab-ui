import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';

import { TestExecutionInput } from  'types/testExecutionInput';

const TEST_EXECUTION_STRUCTURE = `
    id
    name
    environment {
      id
      name
    }
    created
    testCaseExecutions {
      id
      number
      name
      description
      category {
        id
        name
      }
      lastModified
      testResult
    }
`;

@Injectable()
export class TestExecutionService {

  constructor(private apollo: Apollo) {
  }

  fetchTestExecutions() {
    return this.apollo
      .watchQuery({
        query: gql`
          query TestExecutionsQuery {
            findAllTestExecutions {
              ${TEST_EXECUTION_STRUCTURE}
            }
          }`,
        fetchPolicy: 'network-only'
      })
      .valueChanges
      .map((response: any) => response.data.findAllTestExecutions);
  }

  getTestExecution(id: string) {
    return this.apollo
      .watchQuery({
        query: gql`
          query TestExecutionQuery($id: ID!) {
            getTestExecution(id: $id) {
              ${TEST_EXECUTION_STRUCTURE}
            }
          }`,
        variables: { id },
      })
      .valueChanges
      .map((response: any) => response.data.getTestExecution);
  }

  createTestSuite(input: TestExecutionInput) {
    return this.apollo.mutate({
      mutation: gql`
          mutation CreateTestExecution($input: TestExecutionInput!) {
            newTestExecution(input: $input) {
              ${TEST_EXECUTION_STRUCTURE}
            }
          }`,
      variables: {
        input
      }
    })
      .map((response: any) => response.data.newTestExecution);
  }

}
