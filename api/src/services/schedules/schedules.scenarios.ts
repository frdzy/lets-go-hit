import type { Prisma, Schedule } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.ScheduleCreateArgs>({
  schedule: {
    one: {
      data: {
        beginTimestamp: '2022-12-04T23:27:17.828Z',
        createdByUser: { create: { email: 'String4500804' } },
      },
    },
    two: {
      data: {
        beginTimestamp: '2022-12-04T23:27:17.828Z',
        createdByUser: { create: { email: 'String7680531' } },
      },
    },
  },
});

export type StandardScenario = ScenarioData<Schedule, 'schedule'>;
