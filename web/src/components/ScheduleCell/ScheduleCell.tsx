import type {
  FindScheduleQuery,
  FindScheduleQueryVariables,
} from 'types/graphql';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { DateLabel } from 'src/components/date';
import ReservationCell from 'src/components/ReservationCell';

export const QUERY = gql`
  query FindScheduleQuery($id: ID!) {
    schedule: schedule(id: $id) {
      id
      beginTimestamp
      createdByUser {
        id
        name
      }
      reservation {
        id
      }
      confirmations {
        player {
          id
          name
        }
        status
      }
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({
  error,
}: CellFailureProps<FindScheduleQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
);

interface Props
  extends CellSuccessProps<FindScheduleQuery, FindScheduleQueryVariables> {
  children?: React.ReactNode;
}

export const Success = ({ schedule, children }: Props) => {
  return (
    <article key={schedule.id}>
      <header>
        <h2>
          <DateLabel isoTimestamp={schedule.beginTimestamp} /> with{' '}
          {schedule.createdByUser.name ?? 'Unknown Player'}
        </h2>
      </header>
      {schedule.reservation ? (
        <ReservationCell id={schedule.reservation.id} />
      ) : (
        <div>No Reservation</div>
      )}
      <div>
        <div>Confirmations</div>
        <ul>
          {schedule.confirmations.map(
            (c) => c && <li key={c.player.id}>{c.player.name}</li>
          )}
        </ul>
      </div>
      {children}
    </article>
  );
};
