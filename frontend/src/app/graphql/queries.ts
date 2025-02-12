import { gql } from "apollo-angular";

export const GET_PERSONS = gql`
  {
  persons{
    persons{
      _id
      firstName
      patternLastName
      matternLastName
      address
      phoneNumber
    }
  }
}
`;