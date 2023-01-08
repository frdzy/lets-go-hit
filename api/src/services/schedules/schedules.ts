import type {
  QueryResolvers,
  MutationResolvers,
  ScheduleRelationResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';
import { getRequiredCurrentUser } from 'src/lib/post_auth';

export const schedules: QueryResolvers['schedules'] = async () => {
  const currentUser = getRequiredCurrentUser();
  const userConfirmations = await db.confirmation.findMany({
    where: {
      playerId: currentUser.id,
    },
    include: {
      schedule: true,
    },
  });
  return userConfirmations.map((c) => c.schedule);
};

export const schedule: QueryResolvers['schedule'] = ({ id }) => {
  return db.schedule.findUnique({
    where: { id },
  });
};

export const createSchedule: MutationResolvers['createSchedule'] = ({
  input,
}) => {
  const currentUser = getRequiredCurrentUser();
  const createdByUserId = currentUser.id;
  return db.schedule.create({
    data: { ...input, createdByUserId },
  });
};

export const updateSchedule: MutationResolvers['updateSchedule'] = ({
  id,
  input,
}) => {
  return db.schedule.update({
    data: input,
    where: { id },
  });
};

export const deleteSchedule: MutationResolvers['deleteSchedule'] = ({ id }) => {
  return db.schedule.delete({
    where: { id },
  });
};

export const Schedule: ScheduleRelationResolvers = {
  reservation: (_obj, { root }) => {
    return db.schedule.findUnique({ where: { id: root?.id } }).reservation();
  },
  createdByUser: (_obj, { root }) => {
    return db.schedule.findUnique({ where: { id: root?.id } }).createdByUser();
  },
  confirmations: (_obj, { root }) => {
    return db.schedule.findUnique({ where: { id: root?.id } }).confirmations();
  },
};
