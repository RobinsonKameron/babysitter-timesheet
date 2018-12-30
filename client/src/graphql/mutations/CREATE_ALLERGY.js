import gql from 'graphql-tag';

export const CREATE_ALLERGY = gql`
  mutation CreateAllergy($data: AllergyCreateInput!) {
    createAllergy(data: $data) {
      id
    }
  }
`;
