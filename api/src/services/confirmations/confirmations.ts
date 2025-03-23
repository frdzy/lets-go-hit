import type {
  QueryResolvers,
  MutationResolvers,
  ConfirmationRelationResolvers,
} from 'types/graphql';

import { removeNulls } from '@redwoodjs/api';

import { db } from 'src/lib/db';
import { getRequiredCurrentUser } from 'src/lib/post_auth';

export const confirmations: QueryResolvers['confirmations'] = () => {
  return db.confirmation.findMany();
};

export const confirmation: QueryResolvers['confirmation'] = ({ id }) => {
  return db.confirmation.findUnique({
    where: { id },
  });
};

export const createConfirmation: MutationResolvers['createConfirmation'] = ({
  input,
}) => {
  const currentUser = getRequiredCurrentUser();
  return db.confirmation.create({
    data: { ...input, playerId: currentUser.id, status: 'confirmed' },
  });
};

export const updateConfirmation: MutationResolvers['updateConfirmation'] = ({
  id,
  input,
}) => {
  return db.confirmation.update({
    data: removeNulls(input),
    where: { id },
  });
};

export const deleteConfirmation: MutationResolvers['deleteConfirmation'] = ({
  id,
}) => {
  return db.confirmation.delete({
    where: { id },
  });
};

export const Confirmation: ConfirmationRelationResolvers = {
  player: (_obj, { root }) => {
    return db.confirmation
      .findUniqueOrThrow({ where: { id: root?.id } })
      .player();
  },
  schedule: (_obj, { root }) => {
    return db.confirmation
      .findUniqueOrThrow({ where: { id: root?.id } })
      .schedule();
  },
  status: (_obj, { root }) => {
    return root.status === 'confirmed' ? root.status : 'invited';
  },
};
