import type { Prisma, Schedule } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.ScheduleCreateArgs>({
  schedule: {
    one: {
      data: {
        beginTimestamp: '2022-12-22T05:04:51.703Z',
        createdByUser: { create: { email: 'String414669' } },
      },
    },
    two: {
      data: {
        beginTimestamp: '2022-12-22T05:04:51.703Z',
        createdByUser: { create: { email: 'String8839569' } },
      },
    },
  },
});

export type StandardScenario = ScenarioData<
  Schedule,
  'schedule',
  'one' | 'two'
>;
