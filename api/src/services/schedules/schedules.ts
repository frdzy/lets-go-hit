import type {
  QueryResolvers,
  MutationResolvers,
  ScheduleRelationResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';
import { getRequiredCurrentUser } from 'src/lib/post_auth';

export const schedules: QueryResolvers['schedules'] = async (input) => {
  const currentUser = getRequiredCurrentUser();
  const { filter } = input;
  const userConfirmations = await db.confirmation.findMany({
    where: {
      playerId: currentUser.id,
    },
    include: {
      schedule: true,
    },
  });
  const schedules = userConfirmations.map((c) => c.schedule);
  schedules.sort((a, b) => +a.beginTimestamp - +b.beginTimestamp);
  return schedules.filter((s) => {
    return (
      filter === undefined ||
      (filter === 'myUpcoming' &&
        +s.beginTimestamp > +Date.now() - 24 * 60 * 60 * 1000) ||
      (filter === 'myPast' && +s.beginTimestamp < +Date.now())
    );
  });
};

export const schedule: QueryResolvers['schedule'] = ({ id }) => {
  return db.schedule.findUnique({
    where: { id },
  });
};

export const createSchedule: MutationResolvers['createSchedule'] = async ({
  input,
}) => {
  const currentUser = getRequiredCurrentUser();
  const createdByUserId = currentUser.id;
  const result = await db.schedule.create({
    data: { ...input, createdByUserId },
  });
  await db.confirmation.create({
    data: {
      scheduleId: result.id,
      status: 'confirmed',
      playerId: currentUser.id,
    },
  });
  return result;
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

export const deleteSchedule: MutationResolvers['deleteSchedule'] = async ({
  id,
}) => {
  await db.confirmation.deleteMany({
    where: {
      scheduleId: id,
    },
  });
  return await db.schedule.delete({
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
