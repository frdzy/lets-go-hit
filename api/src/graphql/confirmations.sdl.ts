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

  input ConfirmWithEmailInput {
    scheduleId: ID!
    name: String!
    email: String!
  }

  type Mutation {
    createConfirmation(input: CreateConfirmationInput!): Confirmation!
      @requireAuth
    updateConfirmation(id: ID!, input: UpdateConfirmationInput!): Confirmation!
      @requireAuth
    deleteConfirmation(id: ID!): Confirmation! @requireAuth

    # BEGIN custom
    confirmWithEmail(input: ConfirmWithEmailInput!): Confirmation @skipAuth
    # END custom
  }
`;
