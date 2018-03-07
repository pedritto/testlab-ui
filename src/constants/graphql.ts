import gql from 'graphql-tag'

export const ALL_LINKS_QUERY = gql`
  query TestResultValuesQuery {
    getTestResultValues
  }
`;

export interface AllLinkQueryResponse {
  getTestResultValues: String[];
}
