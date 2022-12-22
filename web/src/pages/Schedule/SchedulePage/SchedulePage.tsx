import ScheduleCell from 'src/components/Schedule/ScheduleCell';

type SchedulePageProps = {
  id: string;
};

const SchedulePage = ({ id }: SchedulePageProps) => {
  return <ScheduleCell id={id} />;
};

export default SchedulePage;
