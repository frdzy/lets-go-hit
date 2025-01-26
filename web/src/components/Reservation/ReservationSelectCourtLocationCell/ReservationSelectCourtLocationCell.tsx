import { FindCourtLocations } from 'types/graphql';

import { routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import { QUERY as ExistingQuery } from 'src/components/CourtLocation/CourtLocationsCell';
import { ReferenceTypeaheadSearchFormField } from 'src/components/ReferenceTypeaheadSearchFormField';

export const QUERY = ExistingQuery;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  name,
  defaultValue,
  courtLocations,
}: CellSuccessProps<FindCourtLocations> & {
  name: string;
  defaultValue?: string;
}) => {
  const existingCourtLocation = courtLocations.find(
    (r) => r.id === defaultValue,
  );
  return (
    <ReferenceTypeaheadSearchFormField
      name={name}
      preloadedResults={courtLocations}
      referenceTarget={existingCourtLocation}
      routeToDetails={(id) => routes.editCourtLocation({ id })}
    />
  );
};
