import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import ScheduleForm from 'src/components/Schedule/ScheduleForm';

import type { CreateScheduleInput } from 'types/graphql';

const CREATE_SCHEDULE_MUTATION = gql`
  mutation CreateScheduleMutation($input: CreateScheduleInput!) {
    createSchedule(input: $input) {
      id
    }
  }
`;

const NewSchedule = () => {
  const [createSchedule, { loading, error }] = useMutation(
    CREATE_SCHEDULE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Schedule created');
        navigate(routes.home());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (input: CreateScheduleInput) => {
    createSchedule({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Schedule</h2>
      </header>
      <div className="rw-segment-main">
        <ScheduleForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewSchedule;
