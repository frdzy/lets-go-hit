import type { ComponentMeta } from '@storybook/react'

import SchedulePage from './SchedulePage'

export const generated = () => {
  return <SchedulePage />
}

export default {
  title: 'Pages/SchedulePage',
  component: SchedulePage,
} as ComponentMeta<typeof SchedulePage>
