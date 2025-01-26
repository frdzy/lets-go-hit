import type { CreateReservationInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import ReservationForm from 'src/components/Reservation/ReservationForm';

const CREATE_RESERVATION_MUTATION = gql`
  mutation CreateReservationMutation($input: CreateReservationInput!) {
    createReservation(input: $input) {
      id
    }
  }
`;

const NewReservation = () => {
  const [createReservation, { loading, error }] = useMutation(
    CREATE_RESERVATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Reservation created');
        navigate(routes.reservations());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  const onSave = (input: CreateReservationInput) => {
    createReservation({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Reservation</h2>
      </header>
      <div className="rw-segment-main">
        <ReservationForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewReservation;
