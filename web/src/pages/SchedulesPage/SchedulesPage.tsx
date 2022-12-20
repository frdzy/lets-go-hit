import { MetaTags } from '@redwoodjs/web';

import OpenSchedulesCell from 'src/components/OpenSchedulesCell';

const SchedulesPage = () => {
  return (
    <>
      <MetaTags title="Schedule" description="Schedule page" />
      <h1>Schedules</h1>
      <OpenSchedulesCell />
    </>
  );
};

export default SchedulesPage;
