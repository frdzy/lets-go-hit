import type { FindSchedules } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Schedules from 'src/components/Schedule/Schedules';

export const QUERY = gql`
  query FindSchedules($filter: ScheduleFilterType) {
    schedules(filter: $filter) {
      id
      beginTimestamp
      reservation {
        id
      }
      createdByUser {
        id
        name
      }
      confirmations {
        id
        playerId
        status
      }
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No schedules yet. '}
      <Link to={routes.newSchedule()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ schedules }: CellSuccessProps<FindSchedules>) => {
  return <Schedules schedules={schedules} />;
};
