import type { Prisma, User } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { email: 'String9631176' } },
    two: { data: { email: 'String9358572' } },
  },
});

export type StandardScenario = ScenarioData<User, 'user'>;
