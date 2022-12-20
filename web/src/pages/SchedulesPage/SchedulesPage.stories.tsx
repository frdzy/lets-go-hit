import type { ComponentMeta } from '@storybook/react';

import SchedulesPage from './SchedulesPage';

export const generated = () => {
  return <SchedulesPage />;
};

export default {
  title: 'Pages/SchedulesPage',
  component: SchedulesPage,
} as ComponentMeta<typeof SchedulesPage>;
