import type {
  FindReservationQuery,
  FindReservationQueryVariables,
} from 'types/graphql';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { DateLabel } from 'src/components/date';

export const QUERY = gql`
  query FindReservationQuery($id: ID!) {
    reservation: reservation(id: $id) {
      id
      beginTimestamp
      endTimestamp
      courtLocation {
        id
        name
      }
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({
  error,
}: CellFailureProps<FindReservationQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
);

export const Success = ({
  reservation,
}: CellSuccessProps<FindReservationQuery, FindReservationQueryVariables>) => {
  return (
    <div>
      <div>Reservation</div>
      <div>
        Start time: <DateLabel isoTimestamp={reservation.beginTimestamp} />
      </div>
      <div>
        End time: <DateLabel isoTimestamp={reservation.endTimestamp} />
      </div>
      <div>Location: {reservation.courtLocation.name}</div>
    </div>
  );
};
