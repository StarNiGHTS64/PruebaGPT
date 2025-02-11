const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Person {
        _id: ID!
        firstName: String!
        patternLastName: String!
        matternLastName: String!
        address: String!
        phoneNumber: String!
    }
    type PersonList {
        persons: [Person!]!
    }
    input PersonInputData {
        firstName: String!
        patternLastName: String!
        matternLastName: String!
        address: String!
        phoneNumber: String!
    }
    type RootQuery {
        persons: PersonList!
    }
    type RootMutation {
        createPerson(personInput: PersonInputData): Person!
        updatePerson(id: ID!, personInput: PersonInputData): Person!
    }
    schema{
        query: RootQuery
        mutation: RootMutation
    }
`);