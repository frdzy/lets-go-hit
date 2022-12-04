import { render } from '@redwoodjs/testing/web'

import SchedulePage from './SchedulePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SchedulePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SchedulePage />)
    }).not.toThrow()
  })
})
