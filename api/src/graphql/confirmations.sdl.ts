export const schema = gql`
  enum ConfirmationStatus {
    invited
    confirmed
  }

  type Confirmation {
    id: ID!
    player: User
    playerId: ID
    status: ConfirmationStatus!
    schedule: Schedule!
    scheduleId: ID!
    invitation: Invitation
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

  type Invitation {
    id: ID!
    email: String!
    invitedByUser: User!
    invitedTime: DateTime!
  }

  input CreateInvitationInput {
    scheduleId: ID!
    invitedUserEmail: String!
    invitedUserName: String!
  }

  type Mutation {
    createInvitation(input: CreateInvitationInput!): Confirmation! @requireAuth
    createConfirmation(input: CreateConfirmationInput!): Confirmation!
      @requireAuth
    updateConfirmation(id: ID!, input: UpdateConfirmationInput!): Confirmation!
      @requireAuth
    deleteConfirmation(id: ID!): Confirmation! @requireAuth
  }
`;
