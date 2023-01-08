import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { timeTag } from 'src/lib/formatters';

import type {
  DeleteReservationMutationVariables,
  FindReservationById,
} from 'types/graphql';

const DELETE_RESERVATION_MUTATION = gql`
  mutation DeleteReservationMutation($id: String!) {
    deleteReservation(id: $id) {
      id
    }
  }
`;

interface Props {
  reservation: NonNullable<FindReservationById['reservation']>;
}

const Reservation = ({ reservation }: Props) => {
  const [deleteReservation] = useMutation(DELETE_RESERVATION_MUTATION, {
    onCompleted: () => {
      toast.success('Reservation deleted');
      navigate(routes.reservations());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteReservationMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete reservation ' + id + '?')) {
      deleteReservation({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Reservation {reservation.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{reservation.id}</td>
            </tr>
            <tr>
              <th>Begin timestamp</th>
              <td>{timeTag(reservation.beginTimestamp)}</td>
            </tr>
            <tr>
              <th>End timestamp</th>
              <td>{timeTag(reservation.endTimestamp)}</td>
            </tr>
            <tr>
              <th>Court location id</th>
              <td>{reservation.courtLocationId}</td>
            </tr>
            <tr>
              <th>By user id</th>
              <td>{reservation.byUserId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editReservation({ id: reservation.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(reservation.id)}
        >
          Delete
        </button>
      </nav>
    </>
  );
};

export default Reservation;
