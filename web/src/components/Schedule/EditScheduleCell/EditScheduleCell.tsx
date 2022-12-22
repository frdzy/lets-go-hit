import type { EditScheduleById, UpdateScheduleInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import ScheduleForm from 'src/components/Schedule/ScheduleForm';

export const QUERY = gql`
  query EditScheduleById($id: ID!) {
    schedule: schedule(id: $id) {
      id
      beginTimestamp
      reservationId
      createdByUserId
    }
  }
`;
const UPDATE_SCHEDULE_MUTATION = gql`
  mutation UpdateScheduleMutation($id: ID!, $input: UpdateScheduleInput!) {
    updateSchedule(id: $id, input: $input) {
      id
      beginTimestamp
      reservationId
      createdByUserId
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ schedule }: CellSuccessProps<EditScheduleById>) => {
  const [updateSchedule, { loading, error }] = useMutation(
    UPDATE_SCHEDULE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Schedule updated');
        navigate(routes.schedules());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (
    input: UpdateScheduleInput,
    id: EditScheduleById['schedule']['id']
  ) => {
    updateSchedule({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Schedule {schedule?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ScheduleForm
          schedule={schedule}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
};
