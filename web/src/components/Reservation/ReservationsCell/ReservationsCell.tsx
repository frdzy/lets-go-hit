import type { FindReservations } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Reservations from 'src/components/Reservation/Reservations';

export const QUERY = gql`
  query FindReservations {
    reservations {
      id
      beginTimestamp
      endTimestamp
      courtLocation {
        id
        name
      }
      byUser {
        id
        name
      }
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <>
      return <Reservations reservations={[]} />;
      <div className="rw-text-center">
        {'No reservations yet. '}
        <Link to={routes.newReservation()} className="rw-link">
          {'Create one?'}
        </Link>
      </div>
    </>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  reservations,
}: CellSuccessProps<FindReservations>) => {
  return <Reservations reservations={reservations} />;
};
