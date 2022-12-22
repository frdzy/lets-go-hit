import EditScheduleCell from 'src/components/Schedule/EditScheduleCell';

type SchedulePageProps = {
  id: string;
};

const EditSchedulePage = ({ id }: SchedulePageProps) => {
  return <EditScheduleCell id={id} />;
};

export default EditSchedulePage;
