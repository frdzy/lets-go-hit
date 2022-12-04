import { db } from "src/lib/db";
import { QueryResolvers } from "types/graphql";

export const courtLocations: QueryResolvers["courtLocations"] = (
  _parent: unknown,
  _args: {}
) => db.courtLocation.findMany();
