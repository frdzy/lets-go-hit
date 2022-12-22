import { MetaTags } from '@redwoodjs/web';
import SchedulesCell from 'src/components/Schedule/SchedulesCell';

const SchedulesPage = () => {
  return (
    <>
      <MetaTags title="Schedules" description="Schedules page" />
      <SchedulesCell />
    </>
  );
};

export default SchedulesPage;
