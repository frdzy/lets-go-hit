export const schema = gql`
  type Confirmation {
    id: ID!
    player: User!
    playerId: ID!
    status: String
    schedule: Schedule!
    scheduleId: ID!
  }

  type Query {
    confirmations: [Confirmation!]! @requireAuth
    confirmation(id: ID!): Confirmation @requireAuth
  }

  input CreateConfirmationInput {
    playerId: ID!
    status: String
    scheduleId: ID!
  }

  input UpdateConfirmationInput {
    playerId: ID
    status: String
    scheduleId: ID
  }

  type Mutation {
    createConfirmation(input: CreateConfirmationInput!): Confirmation!
      @requireAuth
    updateConfirmation(
      id: ID!
      input: UpdateConfirmationInput!
    ): Confirmation! @requireAuth
    deleteConfirmation(id: ID!): Confirmation! @requireAuth

    # BEGIN custom
    confirmWithEmail(
      scheduleId: ID!
      name: String!
      email: String!
    ): Confirmation @skipAuth
    # END custom
  }
`;
