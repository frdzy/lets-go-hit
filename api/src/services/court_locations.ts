import { db } from "src/lib/db";

export const courtLocations = (_parent: unknown, _args: {}) =>
  db.courtLocation.findMany();
