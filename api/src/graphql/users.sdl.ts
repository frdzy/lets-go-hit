export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String
    courtLocationsAdded: [CourtLocation]!
    reservations: [Reservation]!
    createdSchedules: [Schedule]!
    schedules: [Schedule]!
    confirmations: [Confirmation]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    name: String
  }

  input UpdateUserInput {
    email: String
    name: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`;