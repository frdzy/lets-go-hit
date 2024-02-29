import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import { CreatorReference } from 'src/components/CreatorReference';
import { Details } from 'src/components/Details';
import { Reference } from 'src/components/Reference';

import { QUERY } from 'src/components/Reservation/ReservationsCell';
import { getReferenceFromReservation, timeTag } from 'src/lib/formatters';

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
            <th>Court location</th>
            <th>By user</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>
                <Details
                  referenceTarget={getReferenceFromReservation(reservation)}
                  routeToDetails={(id) => routes.reservation({ id })}
                  routeToEdit={(id) => routes.editReservation({ id })}
                  onDelete={onDeleteClick}
                />
              </td>
              <td>{timeTag(reservation.beginTimestamp)}</td>
              <td>{timeTag(reservation.endTimestamp)}</td>
              <td>
                <Reference
                  referenceTarget={reservation.courtLocation}
                  routeToDetails={(id) => routes.courtLocation({ id })}
                />
              </td>
              <td>
                <CreatorReference referenceTarget={reservation.byUser} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsList;
