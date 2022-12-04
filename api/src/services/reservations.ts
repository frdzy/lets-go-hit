import type { Reservation as TReservation } from "@prisma/client";
import { db } from "src/lib/db";
import { MutationResolvers, QueryResolvers } from "types/graphql";

export const Reservation = {
  id: (_args: unknown, { root: parent }: { root: TReservation }) => parent.id,
  beginTimestamp: (_args: unknown, { root: parent }: { root: TReservation }) =>
    parent.beginTimestamp.toISOString(),
  endTimestamp: (_args: unknown, { root: parent }: { root: TReservation }) =>
    parent.endTimestamp.toISOString(),
  courtLocation: (_args: unknown, { root: parent }: { root: TReservation }) =>
    db.courtLocation.findFirstOrThrow({
      where: { id: parent.courtLocationId },
    }),
  byUser: (_args: unknown, { root: parent }: { root: TReservation }) =>
    db.user.findFirstOrThrow({
      where: { id: parent.byUserId },
    }),
};

export const reservation: QueryResolvers["reservation"] = async (args: {
  id: string;
}) =>
  await db.reservation.findFirst({
    where: { id: args.id },
    include: { courtLocation: true },
  });

export const createReservation: MutationResolvers["createReservation"] =
  async (args: {
    beginTimestamp: string;
    endTimestamp: string;
    courtLocationId: string;
    byUserId: string;
  }) => {
    const { beginTimestamp, endTimestamp, courtLocationId, byUserId } = args;
    const reservation = await db.reservation.create({
      data: {
        beginTimestamp,
        endTimestamp,
        courtLocationId,
        byUserId,
      },
    });
    const schedule = await db.schedule.create({
      data: {
        reservationId: reservation.id,
        beginTimestamp,
        createdByUserId: byUserId,
      },
    });
    await db.confirmation.create({
      data: {
        scheduleId: schedule.id,
        playerId: byUserId,
        status: "confirmed",
      },
    });
    return reservation;
  };
