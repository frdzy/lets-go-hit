import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/Reservation/ReservationsCell';
import { timeTag, truncate } from 'src/lib/formatters';

import type {
  DeleteReservationMutationVariables,
  FindReservations,
} from 'types/graphql';

const DELETE_RESERVATION_MUTATION = gql`
  mutation DeleteReservationMutation($id: ID!) {
    deleteReservation(id: $id) {
      id
    }
  }
`;

const ReservationsList = ({ reservations }: FindReservations) => {
  const [deleteReservation] = useMutation(DELETE_RESERVATION_MUTATION, {
    onCompleted: () => {
      toast.success('Reservation deleted');
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

  const onDeleteClick = (id: DeleteReservationMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete reservation ' + id + '?')) {
      deleteReservation({ variables: { id } });
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Begin timestamp</th>
            <th>End timestamp</th>
            <th>Court location id</th>
            <th>By user id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{truncate(reservation.id)}</td>
              <td>{timeTag(reservation.beginTimestamp)}</td>
              <td>{timeTag(reservation.endTimestamp)}</td>
              <td>{truncate(reservation.courtLocationId)}</td>
              <td>{truncate(reservation.byUserId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.reservation({ id: reservation.id })}
                    title={'Show reservation ' + reservation.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editReservation({ id: reservation.id })}
                    title={'Edit reservation ' + reservation.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete reservation ' + reservation.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(reservation.id)}
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

export default ReservationsList;
