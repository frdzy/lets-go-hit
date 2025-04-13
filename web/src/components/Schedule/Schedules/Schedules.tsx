import type {
  DeleteScheduleMutationVariables,
  FindSchedules,
} from 'types/graphql';

import { routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { Details } from 'src/components/Details';
import { Reference } from 'src/components/Reference';
import { QUERY } from 'src/components/Schedule/SchedulesCell';
import { getReferenceFromReservation, timeTag } from 'src/lib/formatters';

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
            <th>Name</th>
            <th>Reservation</th>
            <th>Confirmations</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>
                <Details
                  referenceTarget={{
                    ...schedule,
                    name: timeTag(schedule.beginTimestamp),
                  }}
                  routeToDetails={(id) => routes.schedule({ id })}
                  routeToEdit={(id) => routes.editSchedule({ id })}
                  onDelete={onDeleteClick}
                />
              </td>
              <td>
                <Reference
                  referenceTarget={getReferenceFromReservation(
                    schedule.reservation,
                  )}
                  routeToCreate={routes.newReservation}
                  routeToDetails={(id) => routes.reservation({ id: id })}
                />
              </td>
              <td>
                {schedule.confirmations.map((confirmation) => (
                  <div key={confirmation.id}>
                    <span>{confirmation.player?.name ?? 'Unnamed'}</span>{' '}
                    <span>({confirmation.status ?? 'invited'})</span>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchedulesList;
