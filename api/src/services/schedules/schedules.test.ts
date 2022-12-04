import type { Schedule } from '@prisma/client';

import {
  schedules,
  schedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from './schedules';
import type { StandardScenario } from './schedules.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('schedules', () => {
  scenario('returns all schedules', async (scenario: StandardScenario) => {
    const result = await schedules();

    expect(result.length).toEqual(Object.keys(scenario.schedule).length);
  });

  scenario('returns a single schedule', async (scenario: StandardScenario) => {
    const result = await schedule({ id: scenario.schedule.one.id });

    expect(result).toEqual(scenario.schedule.one);
  });

  scenario('creates a schedule', async (scenario: StandardScenario) => {
    const result = await createSchedule({
      input: {
        beginTimestamp: '2022-12-04T23:27:17.813Z',
        createdByUserId: scenario.schedule.two.createdByUserId,
      },
    });

    expect(result.beginTimestamp).toEqual(new Date('2022-12-04T23:27:17.813Z'));
    expect(result.createdByUserId).toEqual(
      scenario.schedule.two.createdByUserId
    );
  });

  scenario('updates a schedule', async (scenario: StandardScenario) => {
    const original = (await schedule({
      id: scenario.schedule.one.id,
    })) as Schedule;
    const result = await updateSchedule({
      id: original.id,
      input: { beginTimestamp: '2022-12-05T23:27:17.813Z' },
    });

    expect(result.beginTimestamp).toEqual(new Date('2022-12-05T23:27:17.813Z'));
  });

  scenario('deletes a schedule', async (scenario: StandardScenario) => {
    const original = (await deleteSchedule({
      id: scenario.schedule.one.id,
    })) as Schedule;
    const result = await schedule({ id: original.id });

    expect(result).toEqual(null);
  });
});
