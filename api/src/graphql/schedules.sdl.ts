export const schema = gql`
  type Schedule {
    id: String!
    beginTimestamp: DateTime!
    reservation: Reservation
    reservationId: String
    createdByUser: User!
    createdByUserId: String!
    confirmations: [Confirmation]!
  }

  type Query {
    schedules: [Schedule!]! @requireAuth
    schedule(id: String!): Schedule @requireAuth
  }

  input CreateScheduleInput {
    beginTimestamp: DateTime!
    reservationId: String
    createdByUserId: String!
  }

  input UpdateScheduleInput {
    beginTimestamp: DateTime
    reservationId: String
    createdByUserId: String
  }

  type Mutation {
    createSchedule(input: CreateScheduleInput!): Schedule! @requireAuth
    updateSchedule(id: String!, input: UpdateScheduleInput!): Schedule!
      @requireAuth
    deleteSchedule(id: String!): Schedule! @requireAuth

    # BEGIN manual
    createScheduleWithoutReservation(
      beginTimestamp: String!
      createdByUserId: ID!
    ): Schedule @skipAuth
    # END manual
  }
`;
