import type { FindScheduleById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Schedule from 'src/components/Schedule/Schedule';

export const QUERY = gql`
  query FindScheduleById($id: ID!) {
    schedule: schedule(id: $id) {
      id
      beginTimestamp
      reservation {
        id
      }
      createdByUser {
        id
        name
      }
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Schedule not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ schedule }: CellSuccessProps<FindScheduleById>) => {
  return <Schedule schedule={schedule} />;
};
