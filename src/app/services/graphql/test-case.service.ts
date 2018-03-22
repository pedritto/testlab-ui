import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';

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

  createTestCase(variables) {
    return this.apollo.mutate({
      mutation: gql`
        mutation CreateTestCase($name: String!, $description: String!, $categoryId: ID!) {
          newTestCase(name: $name, description: $description, categoryId: $categoryId) {
              ${TEST_CASE_STRUCTURE}
            }
          }`,
         variables
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

  updateTestCase(variables) {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateTestCase($id: ID!, $name: String!, $description: String!, $categoryId: ID!) {
          updateTestCase(id: $id, name: $name, description: $description, categoryId: $categoryId) {
            ${TEST_CASE_STRUCTURE}
          }
        }`,
        variables
      })
      .map((response: any) => response.data.updateTestCase);
  }

}
