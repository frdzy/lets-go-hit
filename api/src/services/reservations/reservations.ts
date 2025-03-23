import type {
  QueryResolvers,
  MutationResolvers,
  ReservationRelationResolvers,
} from 'types/graphql';

import { removeNulls } from '@redwoodjs/api';

import { db } from 'src/lib/db';
import { getRequiredCurrentUser } from 'src/lib/post_auth';

export const reservations: QueryResolvers['reservations'] = async () => {
  const currentUser = getRequiredCurrentUser();
  return await db.reservation.findMany({
    where: {
      byUserId: currentUser.id,
    },
    orderBy: {
      beginTimestamp: 'desc',
    },
  });
};

export const openReservations: QueryResolvers['openReservations'] = async ({
  fromScheduleSearch,
}) => {
  const results = [];
  if (fromScheduleSearch) {
    const fromSchedule = await db.schedule.findFirstOrThrow({
      where: {
        id: fromScheduleSearch,
      },
      include: { reservation: true },
    });
    if (fromSchedule.reservation) {
      results.push(fromSchedule.reservation);
    }
  }
  const currentUser = getRequiredCurrentUser();
  const fromUser = await db.reservation.findMany({
    where: {
      byUserId: currentUser.id,
    },
    orderBy: {
      beginTimestamp: 'desc',
    },
    include: {
      schedules: true,
    },
  });
  return results.concat(
    fromUser.filter((r) => {
      return r.schedules.length === 0;
    }),
  );
};

export const reservation: QueryResolvers['reservation'] = ({ id }) => {
  return db.reservation.findUnique({
    where: { id },
  });
};

export const createReservation: MutationResolvers['createReservation'] =
  async ({ input }) => {
    const currentUser = getRequiredCurrentUser();
    const byUserId = currentUser.id;
    const reservation = await db.reservation.create({
      data: { ...input, byUserId },
    });
    const schedule = await db.schedule.create({
      data: {
        reservationId: reservation.id,
        beginTimestamp: input.beginTimestamp,
        createdByUserId: byUserId,
      },
    });
    await db.confirmation.create({
      data: {
        scheduleId: schedule.id,
        playerId: byUserId,
        status: 'confirmed',
      },
    });
    return reservation;
  };

export const updateReservation: MutationResolvers['updateReservation'] = ({
  id,
  input,
}) => {
  return db.reservation.update({
    data: removeNulls(input),
    where: { id },
  });
};

export const deleteReservation: MutationResolvers['deleteReservation'] = ({
  id,
}) => {
  return db.reservation.delete({
    where: { id },
  });
};

export const Reservation: ReservationRelationResolvers = {
  courtLocation: (_obj, { root }) => {
    return db.reservation
      .findUniqueOrThrow({ where: { id: root?.id } })
      .courtLocation();
  },
  byUser: (_obj, { root }) => {
    return db.reservation
      .findUniqueOrThrow({ where: { id: root?.id } })
      .byUser();
  },
  schedules: (_obj, { root }) => {
    return db.reservation
      .findUniqueOrThrow({ where: { id: root?.id } })
      .schedules();
  },
};
