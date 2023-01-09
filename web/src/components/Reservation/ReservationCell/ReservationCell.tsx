import type { FindReservationById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Reservation from 'src/components/Reservation/Reservation';

export const QUERY = gql`
  query FindReservationById($id: ID!) {
    reservation: reservation(id: $id) {
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

export const Empty = () => <div>Reservation not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  reservation,
}: CellSuccessProps<FindReservationById>) => {
  return <Reservation reservation={reservation} />;
};
