import type { Reservation as TReservation } from "@prisma/client";
import { db } from "src/lib/db";

export const Reservation = {
  id: (_args: unknown, { root: parent }: { root: TReservation }) => parent.id,
  beginTimestamp: (_args: unknown, { root: parent }: { root: TReservation }) =>
    parent.beginTimestamp,
  endTimestamp: (_args: unknown, { root: parent }: { root: TReservation }) =>
    parent.endTimestamp,
  courtLocation: (_args: unknown, { root: parent }: { root: TReservation }) =>
    db.courtLocation.findFirstOrThrow({
      where: { id: parent.courtLocationId },
    }),
  byUser: (_args: unknown, { root: parent }: { root: TReservation }) =>
    db.user.findFirstOrThrow({
      where: { id: parent.byUserId },
    }),
};
