import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/Schedule/SchedulesCell';
import { timeTag, truncate } from 'src/lib/formatters';

import type {
  DeleteScheduleMutationVariables,
  FindSchedules,
} from 'types/graphql';

const DELETE_SCHEDULE_MUTATION = gql`
  mutation DeleteScheduleMutation($id: ID!) {
    deleteSchedule(id: $id) {
      id
    }
  }
`;

const SchedulesList = ({ schedules }: FindSchedules) => {
  const [deleteSchedule] = useMutation(DELETE_SCHEDULE_MUTATION, {
    onCompleted: () => {
      toast.success('Schedule deleted');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  });

  const onDeleteClick = (id: DeleteScheduleMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete schedule ' + id + '?')) {
      deleteSchedule({ variables: { id } });
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Begin timestamp</th>
            <th>Reservation id</th>
            <th>Created by user id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>{truncate(schedule.id)}</td>
              <td>{timeTag(schedule.beginTimestamp)}</td>
              <td>{truncate(schedule.reservationId)}</td>
              <td>{truncate(schedule.createdByUserId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.schedule({ id: schedule.id })}
                    title={'Show schedule ' + schedule.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editSchedule({ id: schedule.id })}
                    title={'Edit schedule ' + schedule.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete schedule ' + schedule.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(schedule.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchedulesList;
