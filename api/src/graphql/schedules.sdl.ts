export const schema = gql`
  type Schedule {
    id: ID!
    beginTimestamp: DateTime!
    reservation: Reservation
    reservationId: ID
    createdByUser: User!
    createdByUserId: ID!
    confirmations: [Confirmation]!
  }

  type Query {
    schedules: [Schedule!]! @requireAuth
    schedule(id: ID!): Schedule @requireAuth
  }

  input CreateScheduleInput {
    beginTimestamp: DateTime!
    reservationId: ID
    createdByUserId: ID!
  }

  input UpdateScheduleInput {
    beginTimestamp: DateTime
    reservationId: ID
    createdByUserId: ID
  }

  type Mutation {
    createSchedule(input: CreateScheduleInput!): Schedule! @requireAuth
    updateSchedule(id: ID!, input: UpdateScheduleInput!): Schedule!
      @requireAuth
    deleteSchedule(id: ID!): Schedule! @requireAuth

    # BEGIN manual
    createScheduleWithoutReservation(
      beginTimestamp: String!
      createdByUserId: ID!
    ): Schedule @skipAuth
    # END manual
  }
`;
