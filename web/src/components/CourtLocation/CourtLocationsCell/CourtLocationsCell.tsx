import type { FindCourtLocations } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import CourtLocations from 'src/components/CourtLocation/CourtLocations';

export const QUERY = gql`
  query FindCourtLocations {
    courtLocations {
      id
      name
      address
      notes
      addedBy {
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
      <CourtLocations courtLocations={[]} />;
      <div className="rw-text-center">
        {'No courtLocations yet. '}
        <Link to={routes.newCourtLocation()} className="rw-link">
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
  courtLocations,
}: CellSuccessProps<FindCourtLocations>) => {
  return <CourtLocations courtLocations={courtLocations} />;
};
