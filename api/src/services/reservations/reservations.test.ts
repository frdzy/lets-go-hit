import type { Reservation } from '@prisma/client';

import {
  reservations,
  reservation,
  createReservation,
  updateReservation,
  deleteReservation,
} from './reservations';
import type { StandardScenario } from './reservations.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('reservations', () => {
  scenario('returns all reservations', async (scenario: StandardScenario) => {
    const result = await reservations();

    expect(result.length).toEqual(Object.keys(scenario.reservation).length);
  });

  scenario(
    'returns a single reservation',
    async (scenario: StandardScenario) => {
      const result = await reservation({ id: scenario.reservation.one.id });

      expect(result).toEqual(scenario.reservation.one);
    }
  );

  scenario('creates a reservation', async (scenario: StandardScenario) => {
    const result = await createReservation({
      input: {
        beginTimestamp: '2022-12-04T23:41:24.663Z',
        endTimestamp: '2022-12-04T23:41:24.663Z',
        courtLocationId: scenario.reservation.two.courtLocationId,
        byUserId: scenario.reservation.two.byUserId,
      },
    });

    expect(result.beginTimestamp).toEqual(new Date('2022-12-04T23:41:24.663Z'));
    expect(result.endTimestamp).toEqual(new Date('2022-12-04T23:41:24.663Z'));
    expect(result.courtLocationId).toEqual(
      scenario.reservation.two.courtLocationId
    );
    expect(result.byUserId).toEqual(scenario.reservation.two.byUserId);
  });

  scenario('updates a reservation', async (scenario: StandardScenario) => {
    const original = (await reservation({
      id: scenario.reservation.one.id,
    })) as Reservation;
    const result = await updateReservation({
      id: original.id,
      input: { beginTimestamp: '2022-12-05T23:41:24.663Z' },
    });

    expect(result.beginTimestamp).toEqual(new Date('2022-12-05T23:41:24.663Z'));
  });

  scenario('deletes a reservation', async (scenario: StandardScenario) => {
    const original = (await deleteReservation({
      id: scenario.reservation.one.id,
    })) as Reservation;
    const result = await reservation({ id: original.id });

    expect(result).toEqual(null);
  });
});
