import { db } from "src/lib/db";
import { MutationResolvers } from "types/graphql";

export const confirmWithEmail: MutationResolvers["confirmWithEmail"] =
  async (args: { scheduleId: string; name: string; email: string }) => {
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
