export const schema = gql`
  type Schedule {
    id: ID!
    beginTimestamp: DateTime!
    reservation: Reservation
    createdByUser: User!
    confirmations: [Confirmation]!
  }

  type Query {
    schedules: [Schedule!]! @requireAuth
    schedule(id: ID!): Schedule @requireAuth
  }

  input CreateScheduleInput {
    beginTimestamp: DateTime!
    reservationId: ID
  }

  input UpdateScheduleInput {
    beginTimestamp: DateTime
    reservationId: ID
  }

  type Mutation {
    createSchedule(input: CreateScheduleInput!): Schedule! @requireAuth
    updateSchedule(id: ID!, input: UpdateScheduleInput!): Schedule! @requireAuth
    deleteSchedule(id: ID!): Schedule! @requireAuth
  }
`;
