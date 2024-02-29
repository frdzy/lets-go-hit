import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { ReferenceTypeaheadSearchFormField } from 'src/components/ReferenceTypeaheadSearchFormField';
import { FindReservations } from 'types/graphql';
import { routes } from '@redwoodjs/router';
import { getReferenceFromReservation } from 'src/lib/formatters';

export const QUERY = gql`
  query FindOpenReservations($fromScheduleSearch: ID) {
    reservations: openReservations(fromScheduleSearch: $fromScheduleSearch) {
      id
      beginTimestamp
      courtLocation {
        name
      }
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  name,
  defaultValue,
  reservations,
}: CellSuccessProps<FindReservations> & {
  name: string;
  defaultValue?: string;
}) => {
  const existingReservation = reservations.find((r) => r.id === defaultValue);
  const existingReference = existingReservation
    ? getReferenceFromReservation(existingReservation)
    : undefined;
  return (
    <ReferenceTypeaheadSearchFormField
      name={name}
      preloadedResults={reservations.map(getReferenceFromReservation)}
      referenceTarget={existingReference}
      routeToDetails={(id) => routes.editReservation({ id })}
    />
  );
};
