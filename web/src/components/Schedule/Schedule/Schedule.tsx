import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import { CreatorReference } from 'src/components/CreatorReference';
import { Reference } from 'src/components/Reference';

import { getReferenceFromReservation, timeTag } from 'src/lib/formatters';

import type {
  DeleteScheduleMutationVariables,
  FindScheduleById,
} from 'types/graphql';

const DELETE_SCHEDULE_MUTATION = gql`
  mutation DeleteScheduleMutation($id: ID!) {
    deleteSchedule(id: $id) {
      id
    }
  }
`;

interface Props {
  schedule: NonNullable<FindScheduleById['schedule']>;
}

const Schedule = ({ schedule }: Props) => {
  const [deleteSchedule] = useMutation(DELETE_SCHEDULE_MUTATION, {
    onCompleted: () => {
      toast.success('Schedule deleted');
      navigate(routes.home());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteScheduleMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete schedule ' + id + '?')) {
      deleteSchedule({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Schedule {schedule.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{schedule.id}</td>
            </tr>
            <tr>
              <th>Begin timestamp</th>
              <td>{timeTag(schedule.beginTimestamp)}</td>
            </tr>
            <tr>
              <th>Reservation</th>
              <td>
                <Reference
                  referenceTarget={getReferenceFromReservation(
                    schedule.reservation
                  )}
                  routeToCreate={routes.newReservation}
                  routeToDetails={(id) => routes.reservation({ id: id })}
                />
              </td>
            </tr>
            <tr>
              <th>Created by user</th>
              <td>
                <CreatorReference referenceTarget={schedule.createdByUser} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editSchedule({ id: schedule.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(schedule.id)}
        >
          Delete
        </button>
      </nav>
    </>
  );
};

export default Schedule;
