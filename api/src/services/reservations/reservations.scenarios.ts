import type { Prisma, Reservation } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.ReservationCreateArgs>({
  reservation: {
    one: {
      data: {
        beginTimestamp: '2022-12-04T23:41:24.679Z',
        endTimestamp: '2022-12-04T23:41:24.679Z',
        courtLocation: { create: { name: 'String' } },
        byUser: { create: { email: 'String8526790' } },
      },
    },
    two: {
      data: {
        beginTimestamp: '2022-12-04T23:41:24.679Z',
        endTimestamp: '2022-12-04T23:41:24.679Z',
        courtLocation: { create: { name: 'String' } },
        byUser: { create: { email: 'String852066' } },
      },
    },
  },
});

export type StandardScenario = ScenarioData<Reservation, 'reservation'>;
