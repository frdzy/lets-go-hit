import { makeExecutableSchema } from "@graphql-tools/schema";
import gql from "graphql-tag";
import { Schedule, User } from "@prisma/client";

import { GraphQLContext } from "./context";

const typeDefs = gql`
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
    byUser: User!
  }

  type Schedule {
    id: ID!
    reservation: Reservation
    confirmations: [Confirmation]
  }

  type Confirmation {
    id: ID!
    player: User!
    status: String
  }

  type Query {
    users: [User]
    courtLocations: [CourtLocation]
  }
`;

const resolvers = {
  Query: {
    users: (_parent: unknown, _args: {}, context: GraphQLContext) =>
      context.prisma.user.findMany(),
    courtLocations: (_parent: unknown, _args: {}, context: GraphQLContext) =>
      context.prisma.courtLocation.findMany(),
  },
  User: {
    id: (parent: User) => parent.id,
    email: (parent: User) => parent.email,
    name: (parent: User) => parent.name,
    schedules: async (parent: User, _args: {}, context: GraphQLContext) => {
      const results = await context.prisma.confirmation.findMany({
        where: {
          playerId: parent.id,
        },
        include: {
          schedule: true,
        },
      });
      return results.map((r) => r.schedule);
    },
  },
  Schedule: {
    id: (parent: Schedule) => parent.id,
    reservation: (parent: Schedule, _args: {}, context: GraphQLContext) =>
      parent.reservationId
        ? context.prisma.reservation.findFirst({
            where: {
              id: parent.reservationId,
            },
            include: {
              courtLocation: true,
              byUser: true,
            },
          })
        : null,
    confirmations: (parent: Schedule, _args: {}, context: GraphQLContext) =>
      context.prisma.confirmation.findMany({
        where: {
          scheduleId: parent.id,
        },
        include: {
          player: true,
        },
      }),
  },
};

export const schema = makeExecutableSchema<GraphQLContext>({
  typeDefs,
  resolvers,
});
