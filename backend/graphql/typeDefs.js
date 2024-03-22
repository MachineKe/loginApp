const { gql } = require("apollo-server")

module.exports = gql`
type User {
  id: ID!
  email: String!
  token: String!
  username: String!
  # yob: Int!
  gender: String!
  createdAt: String!
  phone: String!
}

input RegisterInput {
  username: String!
  password: String!
  confirmPassword: String!
  # yob: Int!
  gender: String!
  email: String!
  phone: String!
}

type Query {
    getUsers: [User]
    getUser(userId: ID!): User
  }

type Mutation {
  register(registerInput: RegisterInput): User!
  login(username: String!, password: String!): User!
}
`