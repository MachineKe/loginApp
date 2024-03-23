const { gql } = require("apollo-server")

module.exports = gql`
type User {
  id: ID!
  fullname: String!
  email: String!
  token: String!
  username: String!
  yob: String!
  gender: String!
  createdAt: String!
  phone: String!
  age: String!
}

input RegisterInput {
  fullname: String!
  username: String!
  password: String!
  confirmPassword: String!
  yob: String!
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