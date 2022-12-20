import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import ScheduleCell from 'src/components/ScheduleCell';
import type { OpenSchedulesQuery } from 'types/graphql';

export const QUERY = gql`
  query OpenSchedulesQuery {
    schedules {
      id
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
);

export const Success = ({
  schedules,
}: CellSuccessProps<OpenSchedulesQuery>) => {
  return (
    <ul>
      {schedules.map((item) => {
        return (
          <ScheduleCell key={item.id} id={item.id}>
            <Link
              to={routes.schedule({
                id: item.id,
              })}
            >
              Sign Up
            </Link>
          </ScheduleCell>
        );
      })}
    </ul>
  );
};
