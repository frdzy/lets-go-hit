import type { Schedule as TSchedule } from "@prisma/client";
import { db } from "src/lib/db";

export const Schedule = {
  id: (_args: unknown, { root: parent }: { root: TSchedule }) => parent.id,
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
