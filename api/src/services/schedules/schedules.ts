import { db } from "src/lib/db";

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
