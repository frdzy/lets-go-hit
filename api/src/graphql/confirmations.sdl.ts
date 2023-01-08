export const schema = gql`
  enum ConfirmationStatus {
    invited
    confirmed
  }

  type Confirmation {
    id: ID!
    player: User!
    playerId: ID!
    status: ConfirmationStatus!
    schedule: Schedule!
    scheduleId: ID!
  }

  type Query {
    confirmations: [Confirmation!]! @requireAuth
    confirmation(id: ID!): Confirmation @requireAuth
  }

  input CreateConfirmationInput {
    scheduleId: ID!
  }

  input UpdateConfirmationInput {
    status: String
    scheduleId: ID
  }

  type Mutation {
    createConfirmation(input: CreateConfirmationInput!): Confirmation!
      @requireAuth
    updateConfirmation(id: ID!, input: UpdateConfirmationInput!): Confirmation!
      @requireAuth
    deleteConfirmation(id: ID!): Confirmation! @requireAuth
  }
`;
