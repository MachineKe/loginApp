import gql from 'graphql-tag'

export const FETCH_USERS_QUERY = gql`
query {
  getUsers {
    id
    username
    phone
    email
    createdAt
  }
}
`