import gql from 'graphql-tag'

export const ALL_RESULTS_QUERY = gql`
  query TestResultValuesQuery {
    getTestResultValues
  }
`;
