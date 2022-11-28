import { db } from "src/lib/db";

export const createReservation = async (
  _parent: unknown,
  args: {
    beginTimestamp: string;
    endTimestamp: string;
    courtLocationId: string;
    byUserId: string;
  }
) => {
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