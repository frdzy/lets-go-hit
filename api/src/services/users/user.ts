import type { User } from "@prisma/client";
import { db } from "src/lib/db";

export const user = {
  id: (parent: User) => parent.id,
  email: (parent: User) => parent.email,
  name: (parent: User) => parent.name,
  schedules: async (parent: User, _args: {}) => {
    const results = await db.confirmation.findMany({
      where: {
        playerId: parent.id,
      },
      include: {
        schedule: true,
      },
    });
    return results.map((r) => r.schedule);
  },
};
