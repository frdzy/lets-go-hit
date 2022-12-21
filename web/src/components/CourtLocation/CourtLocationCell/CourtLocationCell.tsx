import type { FindCourtLocationById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import CourtLocation from 'src/components/CourtLocation/CourtLocation';

export const QUERY = gql`
  query FindCourtLocationById($id: String!) {
    courtLocation: courtLocation(id: $id) {
      id
      name
      address
      notes
      addedById
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>CourtLocation not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  courtLocation,
}: CellSuccessProps<FindCourtLocationById>) => {
  return <CourtLocation courtLocation={courtLocation} />;
};
