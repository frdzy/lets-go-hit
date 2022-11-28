import type { Reservation } from "@prisma/client";
import { db } from "src/lib/db";

export const reservation = {
  id: (parent: Reservation) => parent.id,
  beginTimestamp: (parent: Reservation) => parent.beginTimestamp,
  endTimestamp: (parent: Reservation) => parent.endTimestamp,
  courtLocation: (parent: Reservation, _args: {}) =>
    db.courtLocation.findFirstOrThrow({
      where: { id: parent.courtLocationId },
    }),
  byUser: (parent: Reservation, _args: {}) =>
    db.user.findFirstOrThrow({
      where: { id: parent.byUserId },
    }),
};
