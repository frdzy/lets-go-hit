import type { Schedule as TSchedule } from "@prisma/client";
import { db } from "src/lib/db";

export const Schedule = {
  id: (_args: unknown, { root: parent }: { root: TSchedule }) => parent.id,
  beginTimestamp: (_args: unknown, { root: parent }: { root: TSchedule }) =>
    parent.beginTimestamp.toISOString(),
  createdByUser: (_args: unknown, { root: parent }: { root: TSchedule }) =>
    db.user.findFirstOrThrow({ where: { id: parent.createdByUserId } }),
  reservation: (_args: unknown, { root: parent }: { root: TSchedule }) =>
    parent.reservationId
      ? db.reservation.findFirst({
          where: {
            id: parent.reservationId,
          },
          include: {
            courtLocation: true,
            byUser: true,
          },
        })
      : null,
  confirmations: (_args: unknown, { root: parent }: { root: TSchedule }) =>
    db.confirmation.findMany({
      where: {
        scheduleId: parent.id,
      },
      include: {
        player: true,
      },
    }),
};

export const schedules = (_parent: unknown, _args: {}) =>
  db.schedule.findMany();

export const createScheduleWithoutReservation = async (
  _parent: unknown,
  args: { beginTimestamp: string; createdByUserId: string }
) => {
  const schedule = await db.schedule.create({
    data: args,
  });
  await db.confirmation.create({
    data: {
      scheduleId: schedule.id,
      playerId: args.createdByUserId,
      status: "confirmed",
    },
  });
  return schedule;
};
