export const schema = gql`
  type Confirmation {
    id: String!
    player: User!
    playerId: String!
    status: String
    schedule: Schedule!
    scheduleId: String!
  }

  type Query {
    confirmations: [Confirmation!]! @requireAuth
    confirmation(id: String!): Confirmation @requireAuth
  }

  input CreateConfirmationInput {
    playerId: String!
    status: String
    scheduleId: String!
  }

  input UpdateConfirmationInput {
    playerId: String
    status: String
    scheduleId: String
  }

  type Mutation {
    createConfirmation(input: CreateConfirmationInput!): Confirmation!
      @requireAuth
    updateConfirmation(
      id: String!
      input: UpdateConfirmationInput!
    ): Confirmation! @requireAuth
    deleteConfirmation(id: String!): Confirmation! @requireAuth

    # BEGIN custom
    confirmWithEmail(
      scheduleId: ID!
      name: String!
      email: String!
    ): Confirmation @skipAuth
    # END custom
  }
`;
