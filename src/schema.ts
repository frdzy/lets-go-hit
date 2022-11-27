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

  type Mutation {
    confirmWithEmail(
      scheduleId: ID!
      name: String!
      email: String!
    ): Confirmation
  }
`;

const resolvers = {
  Query: {
    users: (_parent: unknown, _args: {}, { prisma }: GraphQLContext) =>
      prisma.user.findMany(),
    courtLocations: (_parent: unknown, _args: {}, { prisma }: GraphQLContext) =>
      prisma.courtLocation.findMany(),
  },
  Mutation: {
    confirmWithEmail: async (
      _parent: unknown,
      args: { scheduleId: string; name: string; email: string },
      { prisma }: GraphQLContext
    ) => {
      const { scheduleId, name, email } = args;
      let user = await prisma.user.findFirst({
        where: { email },
      });
      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            name,
          },
        });
      }
      return await prisma.confirmation.create({
        data: {
          scheduleId,
          playerId: user.id,
          status: "confirmed",
        },
        include: {
          player: true,
        },
      });
    },
  },
  User: {
    id: (parent: User) => parent.id,
    email: (parent: User) => parent.email,
    name: (parent: User) => parent.name,
    schedules: async (parent: User, _args: {}, { prisma }: GraphQLContext) => {
      const results = await prisma.confirmation.findMany({
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
    reservation: (parent: Schedule, _args: {}, { prisma }: GraphQLContext) =>
      parent.reservationId
        ? prisma.reservation.findFirst({
            where: {
              id: parent.reservationId,
            },
            include: {
              courtLocation: true,
              byUser: true,
            },
          })
        : null,
    confirmations: (parent: Schedule, _args: {}, { prisma }: GraphQLContext) =>
      prisma.confirmation.findMany({
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
