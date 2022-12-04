import type { Prisma, Confirmation } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.ConfirmationCreateArgs>({
  confirmation: {
    one: {
      data: {
        player: { create: { email: 'String6873489' } },
        schedule: {
          create: {
            beginTimestamp: '2022-12-04T23:34:38.959Z',
            createdByUser: { create: { email: 'String8513825' } },
          },
        },
      },
    },
    two: {
      data: {
        player: { create: { email: 'String4644770' } },
        schedule: {
          create: {
            beginTimestamp: '2022-12-04T23:34:38.960Z',
            createdByUser: { create: { email: 'String3162650' } },
          },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<Confirmation, 'confirmation'>;
