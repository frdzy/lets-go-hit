import type { CourtLocation } from '@prisma/client';

import {
  courtLocations,
  courtLocation,
  createCourtLocation,
  updateCourtLocation,
  deleteCourtLocation,
} from './courtLocations';
import type { StandardScenario } from './courtLocations.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('courtLocations', () => {
  scenario('returns all courtLocations', async (scenario: StandardScenario) => {
    const result = await courtLocations();

    expect(result.length).toEqual(Object.keys(scenario.courtLocation).length);
  });

  scenario(
    'returns a single courtLocation',
    async (scenario: StandardScenario) => {
      const result = await courtLocation({ id: scenario.courtLocation.one.id });

      expect(result).toEqual(scenario.courtLocation.one);
    }
  );

  scenario('creates a courtLocation', async (scenario: StandardScenario) => {
    mockCurrentUser({
      id: scenario.courtLocation.two.addedById,
      email: scenario.courtLocation.two.addedById,
    });
    const result = await createCourtLocation({
      input: { name: 'String' },
    });

    expect(result.name).toEqual('String');
  });

  scenario('updates a courtLocation', async (scenario: StandardScenario) => {
    const original = (await courtLocation({
      id: scenario.courtLocation.one.id,
    })) as CourtLocation;
    const result = await updateCourtLocation({
      id: original.id,
      input: { name: 'String2' },
    });

    expect(result.name).toEqual('String2');
  });

  scenario('deletes a courtLocation', async (scenario: StandardScenario) => {
    const original = (await deleteCourtLocation({
      id: scenario.courtLocation.one.id,
    })) as CourtLocation;
    const result = await courtLocation({ id: original.id });

    expect(result).toEqual(null);
  });
});
