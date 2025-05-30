import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';

export const userCount: QueryResolvers['userCount'] = () => {
  return db.user.count();
};

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany();
};

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  });
};

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  let { email, name } = input;
  if (email === null) {
    email = undefined;
  }
  if (name === null) {
    name = undefined;
  }
  return db.user.update({
    data: { email, name },
    where: { id },
  });
};

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  });
};

export const User: UserRelationResolvers = {
  courtLocationsAdded: (_obj, { root }) => {
    return db.user
      .findUniqueOrThrow({ where: { id: root?.id } })
      .courtLocationsAdded();
  },
  reservations: (_obj, { root }) => {
    return db.user
      .findUniqueOrThrow({ where: { id: root?.id } })
      .reservations();
  },
  createdSchedules: (_obj, { root }) => {
    return db.user
      .findUniqueOrThrow({ where: { id: root?.id } })
      .createdSchedules();
  },
  schedules: async (_obj, { root }) => {
    const results = await db.confirmation.findMany({
      where: {
        playerId: root.id,
      },
      include: {
        schedule: true,
      },
    });
    return results.map((r) => r.schedule);
  },
  confirmations: (_obj, { root }) => {
    return db.user
      .findUniqueOrThrow({ where: { id: root?.id } })
      .confirmations();
  },
};
