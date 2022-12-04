import type {
  QueryResolvers,
  MutationResolvers,
  ConfirmationRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const confirmations: QueryResolvers["confirmations"] = () => {
  return db.confirmation.findMany();
};

export const confirmation: QueryResolvers["confirmation"] = ({ id }) => {
  return db.confirmation.findUnique({
    where: { id },
  });
};

export const createConfirmation: MutationResolvers["createConfirmation"] = ({
  input,
}) => {
  return db.confirmation.create({
    data: input,
  });
};

export const updateConfirmation: MutationResolvers["updateConfirmation"] = ({
  id,
  input,
}) => {
  return db.confirmation.update({
    data: input,
    where: { id },
  });
};

export const deleteConfirmation: MutationResolvers["deleteConfirmation"] = ({
  id,
}) => {
  return db.confirmation.delete({
    where: { id },
  });
};

export const confirmWithEmail: MutationResolvers["confirmWithEmail"] =
  async (args: {input: { scheduleId: string; name: string; email: string }}) => {
    const { scheduleId, name, email } = args.input;
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

export const Confirmation: ConfirmationRelationResolvers = {
  player: (_obj, { root }) => {
    return db.confirmation.findUnique({ where: { id: root?.id } }).player();
  },
  schedule: (_obj, { root }) => {
    return db.confirmation.findUnique({ where: { id: root?.id } }).schedule();
  },
};
