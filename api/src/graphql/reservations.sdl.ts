export const schema = gql`
  type Reservation {
    id: ID!
    beginTimestamp: DateTime!
    endTimestamp: DateTime!
    courtLocation: CourtLocation!
    courtLocationId: ID!
    byUser: User!
    byUserId: ID!
    schedules: [Schedule]!
  }

  type Query {
    reservations: [Reservation!]! @requireAuth
    openReservations(fromScheduleSearch: ID): [Reservation!]! @requireAuth
    reservation(id: ID!): Reservation @requireAuth
  }

  input CreateReservationInput {
    beginTimestamp: DateTime!
    endTimestamp: DateTime!
    courtLocationId: ID!
  }

  input UpdateReservationInput {
    beginTimestamp: DateTime
    endTimestamp: DateTime
    courtLocationId: ID
  }

  type Mutation {
    createReservation(input: CreateReservationInput!): Reservation! @requireAuth
    updateReservation(id: ID!, input: UpdateReservationInput!): Reservation!
      @requireAuth
    deleteReservation(id: ID!): Reservation! @requireAuth
  }
`;
