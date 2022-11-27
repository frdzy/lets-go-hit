import { makeExecutableSchema } from "@graphql-tools/schema";
import gql from "graphql-tag";
import { Reservation, Schedule, User } from "@prisma/client";

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
    beginTimestamp: String!
    endTimestamp: String!
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
    createReservation(
      beginTimestamp: String!
      endTimestamp: String!
      courtLocationId: ID!
      byUserId: ID!
    ): Reservation

    createScheduleWithoutReservation(
      beginTimestamp: String!
      byUserId: ID!
    ): Schedule

    confirmWithEmail(
      scheduleId: ID!
      name: String!
      email: String!
    ): Confirmation
  }
`;

const Query = {
  users: (_parent: unknown, _args: {}, { prisma }: GraphQLContext) =>
    prisma.user.findMany(),
  courtLocations: (_parent: unknown, _args: {}, { prisma }: GraphQLContext) =>
    prisma.courtLocation.findMany(),
};

const Mutation = {
  createReservation: async (
    _parent: unknown,
    args: {
      beginTimestamp: string;
      endTimestamp: string;
      courtLocationId: string;
      byUserId: string;
    },
    { prisma }: GraphQLContext
  ) => {
    const { beginTimestamp, endTimestamp, courtLocationId, byUserId } = args;
    const reservation = await prisma.reservation.create({
      data: {
        beginTimestamp,
        endTimestamp,
        courtLocationId,
        byUserId,
      },
    });
    const schedule = await prisma.schedule.create({
      data: {
        reservationId: reservation.id,
        beginTimestamp,
        createdByUserId: byUserId,
      },
    });
    await prisma.confirmation.create({
      data: {
        scheduleId: schedule.id,
        playerId: byUserId,
        status: "confirmed",
      },
    });
    return reservation;
  },

  createScheduleWithoutReservation: async (
    _parent: unknown,
    args: { beginTimestamp: string; createdByUserId: string },
    { prisma }: GraphQLContext
  ) => {
    const schedule = await prisma.schedule.create({
      data: args,
    });
    await prisma.confirmation.create({
      data: {
        scheduleId: schedule.id,
        playerId: args.createdByUserId,
        status: "confirmed",
      },
    });
    return schedule;
  },

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
};

const models = {
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

  Reservation: {
    id: (parent: Reservation) => parent.id,
    beginTimestamp: (parent: Reservation) => parent.beginTimestamp,
    endTimestamp: (parent: Reservation) => parent.endTimestamp,
    courtLocation: (
      parent: Reservation,
      _args: {},
      { prisma }: GraphQLContext
    ) =>
      prisma.courtLocation.findFirstOrThrow({
        where: { id: parent.courtLocationId },
      }),
    byUser: (parent: Reservation, _args: {}, { prisma }: GraphQLContext) =>
      prisma.user.findFirstOrThrow({
        where: { id: parent.byUserId },
      }),
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

const resolvers = {
  Query,
  Mutation,
  ...models,
};

export const schema = makeExecutableSchema<GraphQLContext>({
  typeDefs,
  resolvers,
});
