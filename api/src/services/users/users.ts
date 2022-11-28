import { db } from "src/lib/db";

export const users = (_parent: unknown, _args: {}) => db.user.findMany();
