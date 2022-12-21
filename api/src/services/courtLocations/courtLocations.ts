import type {
  QueryResolvers,
  MutationResolvers,
  CourtLocationRelationResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';
import { getRequiredCurrentUser } from 'src/lib/post_auth';

export const courtLocations: QueryResolvers['courtLocations'] = () => {
  return db.courtLocation.findMany();
};

export const courtLocation: QueryResolvers['courtLocation'] = ({ id }) => {
  return db.courtLocation.findUnique({
    where: { id },
  });
};

export const createCourtLocation: MutationResolvers['createCourtLocation'] = ({
  input,
}) => {
  const currentUser = getRequiredCurrentUser();
  const addedById = currentUser.id;
  return db.courtLocation.create({
    data: { ...input, addedById },
  });
};

export const updateCourtLocation: MutationResolvers['updateCourtLocation'] = ({
  id,
  input,
}) => {
  return db.courtLocation.update({
    data: input,
    where: { id },
  });
};

export const deleteCourtLocation: MutationResolvers['deleteCourtLocation'] = ({
  id,
}) => {
  return db.courtLocation.delete({
    where: { id },
  });
};

export const CourtLocation: CourtLocationRelationResolvers = {
  addedBy: (_obj, { root }) => {
    return db.courtLocation.findUnique({ where: { id: root?.id } }).addedBy();
  },
  reservations: (_obj, { root }) => {
    return db.courtLocation
      .findUnique({ where: { id: root?.id } })
      .reservations();
  },
};
