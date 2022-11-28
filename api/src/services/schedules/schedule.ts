import type { Schedule } from "@prisma/client";
import { db } from "src/lib/db";

export const schedule = {
  id: (parent: Schedule) => parent.id,
  reservation: (parent: Schedule, _args: {}) =>
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
  confirmations: (parent: Schedule, _args: {}) =>
    db.confirmation.findMany({
      where: {
        scheduleId: parent.id,
      },
      include: {
        player: true,
      },
    }),
};
