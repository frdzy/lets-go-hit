import type {
  QueryResolvers,
  MutationResolvers,
  ConfirmationRelationResolvers,
} from 'types/graphql';

import { removeNulls } from '@redwoodjs/api';

import { db } from 'src/lib/db';
import { generateCodeAndHash, sendInvite } from 'src/lib/send_invite';
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

export const createInvitation: MutationResolvers['createInvitation'] = async ({
  input,
}) => {
  const { invitedUserEmail, invitedUserName, scheduleId } = input;
  const currentUser = getRequiredCurrentUser();

  const invitedUser = await db.user.findFirst({
    where: {
      email: invitedUserEmail,
    },
  });
  let targetType: 'verified' | 'unverifiedEmail' | 'manual';
  if (invitedUser) {
    targetType = 'verified';
  } else if (invitedUserEmail) {
    targetType = 'unverifiedEmail';
  } else {
    targetType = 'manual';
  }

  const confirmation = await db.confirmation.create({
    data: {
      targetType,
      scheduleId: scheduleId,
      playerId: invitedUser?.id,
      status: 'invited',
      manualName: invitedUserName,
    },
  });

  if (targetType === 'verified' || targetType === 'unverifiedEmail') {
    const { code, hash } = await generateCodeAndHash();

    const invitation = await db.invitation.create({
      data: {
        email: input.invitedUserEmail,
        confirmationId: confirmation.id,
        hashedCode: hash,
        invitedByUserId: currentUser.id,
        invitedTime: new Date(),
        emailSuccess: false,
      },
    });
    const { error } = await sendInvite({
      invitationId: invitation.id,
      invitedUserEmail: input.invitedUserEmail,
      inviteCode: code,
    });
    if (!error) {
      await db.invitation.update({
        where: {
          id: invitation.id,
        },
        data: {
          emailSuccess: true,
        },
      });
    }
  }

  return confirmation;
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
  invitation: (_obj, { root }) => {
    return db.confirmation.findUnique({ where: { id: root?.id } }).invitation();
  },
};
