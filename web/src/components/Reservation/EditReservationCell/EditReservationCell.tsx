import type {
  EditReservationById,
  UpdateReservationInput,
} from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import ReservationForm from 'src/components/Reservation/ReservationForm';

export const QUERY = gql`
  query EditReservationById($id: String!) {
    reservation: reservation(id: $id) {
      id
      beginTimestamp
      endTimestamp
      courtLocationId
      byUserId
    }
  }
`;
const UPDATE_RESERVATION_MUTATION = gql`
  mutation UpdateReservationMutation(
    $id: String!
    $input: UpdateReservationInput!
  ) {
    updateReservation(id: $id, input: $input) {
      id
      beginTimestamp
      endTimestamp
      courtLocationId
      byUserId
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  reservation,
}: CellSuccessProps<EditReservationById>) => {
  const [updateReservation, { loading, error }] = useMutation(
    UPDATE_RESERVATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Reservation updated');
        navigate(routes.reservations());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (
    input: UpdateReservationInput,
    id: EditReservationById['reservation']['id']
  ) => {
    updateReservation({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Reservation {reservation?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ReservationForm
          reservation={reservation}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
};
