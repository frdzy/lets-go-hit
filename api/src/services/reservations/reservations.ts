import type {
  QueryResolvers,
  MutationResolvers,
  ReservationRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const reservations: QueryResolvers["reservations"] = () => {
  return db.reservation.findMany();
};

export const reservation: QueryResolvers["reservation"] = ({ id }) => {
  return db.reservation.findUnique({
    where: { id },
  });
};

export const createReservation: MutationResolvers["createReservation"] =
  async ({ input }) => {
    const reservation = await db.reservation.create({
      data: input,
    });
    const schedule = await db.schedule.create({
      data: {
        reservationId: reservation.id,
        beginTimestamp: input.beginTimestamp,
        createdByUserId: input.byUserId,
      },
    });
    await db.confirmation.create({
      data: {
        scheduleId: schedule.id,
        playerId: input.byUserId,
        status: "confirmed",
      },
    });
    return reservation;
  };

export const updateReservation: MutationResolvers["updateReservation"] = ({
  id,
  input,
}) => {
  return db.reservation.update({
    data: input,
    where: { id },
  });
};

export const deleteReservation: MutationResolvers["deleteReservation"] = ({
  id,
}) => {
  return db.reservation.delete({
    where: { id },
  });
};

export const Reservation: ReservationRelationResolvers = {
  courtLocation: (_obj, { root }) => {
    return db.reservation
      .findUnique({ where: { id: root?.id } })
      .courtLocation();
  },
  byUser: (_obj, { root }) => {
    return db.reservation.findUnique({ where: { id: root?.id } }).byUser();
  },
  schedules: (_obj, { root }) => {
    return db.reservation.findUnique({ where: { id: root?.id } }).schedules();
  },
};
