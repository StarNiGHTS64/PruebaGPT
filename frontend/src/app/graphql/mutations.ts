import { gql } from "apollo-angular";

export const CREATE_PERSON = gql`
  mutation createPerson(
    $firstName: String!,
    $patternLastName: String!,
    $matternLastName: String!,
    $address: String!,
    $phoneNumber: String!
  ){
    createPerson(personInput: { 
    firstName: $firstName, 
    patternLastName: $patternLastName,
    matternLastName: $matternLastName,
    address: $address,
    phoneNumber: $phoneNumber
    }) {
      _id
      firstName
      patternLastName
      matternLastName
      address
      phoneNumber
    }
  }
`;

export const DELETE_PERSON = gql`
  mutation deletePerson($id: ID!){
    deletePerson(id: $id){
      _id
      firstName
      patternLastName
      matternLastName
      address
      phoneNumber

    }
  }
`

export const UPDATE_PERSON = gql`
  mutation updatePerson(
    $id: ID!,
    $firstName: String!,
    $patternLastName: String!,
    $matternLastName: String!,
    $address: String!,
    $phoneNumber: String!
  ){
    updatePerson(id: $id, personInput:{
      firstName: $firstName,
      patternLastName: $patternLastName,
      matternLastName: $matternLastName,
      address: $address,
      phoneNumber: $phoneNumber
    }) {
      firstName
      patternLastName
      matternLastName
      address
      phoneNumber
  }
}
`