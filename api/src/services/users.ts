import type { User as TUser } from "@prisma/client";
import { db } from "src/lib/db";

export const User = {
  id: (_args: unknown, { root: parent }: { root: TUser }) => {
    return parent.id;
  },
  email: (_args: unknown, { root: parent }: { root: TUser }) => parent.email,
  name: (_args: unknown, { root: parent }: { root: TUser }) => parent.name,
  schedules: async (_argus: unknown, { root: parent }: { root: TUser }) => {
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

export const users = (_parent: unknown, _args: {}) => db.user.findMany();
