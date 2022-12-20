import type {
  QueryResolvers,
  MutationResolvers,
  ScheduleRelationResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';

export const schedules: QueryResolvers['schedules'] = () => {
  return db.schedule.findMany();
};

export const schedule: QueryResolvers['schedule'] = ({ id }) => {
  return db.schedule.findUnique({
    where: { id },
  });
};

export const createSchedule: MutationResolvers['createSchedule'] = ({
  input,
}) => {
  return db.schedule.create({
    data: input,
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
  beginTimestamp: (_obj, { root }) => root.beginTimestamp.toISOString(),
};

export const createScheduleWithoutReservation: MutationResolvers['createScheduleWithoutReservation'] =
  async (args: { beginTimestamp: string; createdByUserId: string }) => {
    const schedule = await db.schedule.create({
      data: args,
    });
    await db.confirmation.create({
      data: {
        scheduleId: schedule.id,
        playerId: args.createdByUserId,
        status: 'confirmed',
      },
    });
    return schedule;
  };
