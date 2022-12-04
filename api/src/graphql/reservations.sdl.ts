export const schema = gql`
  type Reservation {
    id: String!
    beginTimestamp: DateTime!
    endTimestamp: DateTime!
    courtLocation: CourtLocation!
    courtLocationId: String!
    byUser: User!
    byUserId: String!
    schedules: [Schedule]!
  }

  type Query {
    reservations: [Reservation!]! @requireAuth
    reservation(id: String!): Reservation @requireAuth
  }

  input CreateReservationInput {
    beginTimestamp: DateTime!
    endTimestamp: DateTime!
    courtLocationId: String!
    byUserId: String!
  }

  input UpdateReservationInput {
    beginTimestamp: DateTime
    endTimestamp: DateTime
    courtLocationId: String
    byUserId: String
  }

  type Mutation {
    createReservation(input: CreateReservationInput!): Reservation! @requireAuth
    updateReservation(
      id: String!
      input: UpdateReservationInput!
    ): Reservation! @requireAuth
    deleteReservation(id: String!): Reservation! @requireAuth
  }
`;
