import type { Confirmation } from '@prisma/client';

import {
  confirmations,
  confirmation,
  createConfirmation,
  updateConfirmation,
  deleteConfirmation,
} from './confirmations';
import type { StandardScenario } from './confirmations.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('confirmations', () => {
  scenario('returns all confirmations', async (scenario: StandardScenario) => {
    const result = await confirmations();

    expect(result.length).toEqual(Object.keys(scenario.confirmation).length);
  });

  scenario(
    'returns a single confirmation',
    async (scenario: StandardScenario) => {
      const result = await confirmation({ id: scenario.confirmation.one.id });

      expect(result).toEqual(scenario.confirmation.one);
    }
  );

  scenario('creates a confirmation', async (scenario: StandardScenario) => {
    const result = await createConfirmation({
      input: {
        playerId: scenario.confirmation.two.playerId,
        scheduleId: scenario.confirmation.two.scheduleId,
      },
    });

    expect(result.playerId).toEqual(scenario.confirmation.two.playerId);
    expect(result.scheduleId).toEqual(scenario.confirmation.two.scheduleId);
  });

  scenario('updates a confirmation', async (scenario: StandardScenario) => {
    const original = (await confirmation({
      id: scenario.confirmation.one.id,
    })) as Confirmation;
    const result = await updateConfirmation({
      id: original.id,
      input: { playerId: scenario.confirmation.two.playerId },
    });

    expect(result.playerId).toEqual(scenario.confirmation.two.playerId);
  });

  scenario('deletes a confirmation', async (scenario: StandardScenario) => {
    const original = (await deleteConfirmation({
      id: scenario.confirmation.one.id,
    })) as Confirmation;
    const result = await confirmation({ id: original.id });

    expect(result).toEqual(null);
  });
});
