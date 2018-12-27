import gql from 'graphql-tag';

export const SITTE_QUERY = gql`
  query Sitte($where: SitteWhereUniqueInput!) {
    sitte(where: $where) {
      firstName
      lastName
      birthday
      rateAmount
      rateType
      createdAt
      updatedAt
      gender
      owner {
        firstName
        lastName
      }
    }
  }
`;
