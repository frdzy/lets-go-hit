import type { Prisma, CourtLocation } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.CourtLocationCreateArgs>({
  courtLocation: {
    one: { data: { name: 'String' } },
    two: { data: { name: 'String' } },
  },
});

export type StandardScenario = ScenarioData<CourtLocation, 'courtLocation'>;
