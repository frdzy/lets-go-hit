import gql from "graphql-tag";

export const schema = gql`
  type User {
    id: ID!
    email: String!
    name: String
    schedules: [Schedule]
  }

  type CourtLocation {
    id: ID!
    name: String!
    address: String
  }

  type Reservation {
    id: ID!
    courtLocation: CourtLocation!
    beginTimestamp: String!
    endTimestamp: String!
    byUser: User!
  }

  type Schedule {
    id: ID!
    beginTimestamp: String!
    createdByUser: User!
    reservation: Reservation
    confirmations: [Confirmation]
  }

  type Confirmation {
    id: ID!
    player: User!
    status: String
  }

  type Query {
    users: [User] @skipAuth
    courtLocations: [CourtLocation] @skipAuth
    schedules: [Schedule] @skipAuth
    reservation(id: ID!): Reservation @skipAuth
  }

  type Mutation {
    createReservation(
      beginTimestamp: String!
      endTimestamp: String!
      courtLocationId: ID!
      byUserId: ID!
    ): Reservation @skipAuth

    createScheduleWithoutReservation(
      beginTimestamp: String!
      createdByUserId: ID!
    ): Schedule @skipAuth

    confirmWithEmail(
      scheduleId: ID!
      name: String!
      email: String!
    ): Confirmation @skipAuth
  }
`;
