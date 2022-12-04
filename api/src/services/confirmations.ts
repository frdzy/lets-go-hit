import { db } from "src/lib/db";

export const confirmWithEmail = async (
  _parent: unknown,
  args: { scheduleId: string; name: string; email: string }
) => {
  const { scheduleId, name, email } = args;
  let user = await db.user.findFirst({
    where: { email },
  });
  if (!user) {
    user = await db.user.create({
      data: {
        email,
        name,
      },
    });
  }
  return await db.confirmation.create({
    data: {
      scheduleId,
      playerId: user.id,
      status: "confirmed",
    },
    include: {
      player: true,
    },
  });
};
