import type {
  EditCourtLocationById,
  UpdateCourtLocationInput,
} from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import CourtLocationForm from 'src/components/CourtLocation/CourtLocationForm';

export const QUERY = gql`
  query EditCourtLocationById($id: String!) {
    courtLocation: courtLocation(id: $id) {
      id
      name
      address
      notes
      addedById
    }
  }
`;
const UPDATE_COURT_LOCATION_MUTATION = gql`
  mutation UpdateCourtLocationMutation(
    $id: String!
    $input: UpdateCourtLocationInput!
  ) {
    updateCourtLocation(id: $id, input: $input) {
      id
      name
      address
      notes
      addedById
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  courtLocation,
}: CellSuccessProps<EditCourtLocationById>) => {
  const [updateCourtLocation, { loading, error }] = useMutation(
    UPDATE_COURT_LOCATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('CourtLocation updated');
        navigate(routes.courtLocations());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  const onSave = (
    input: UpdateCourtLocationInput,
    id: EditCourtLocationById['courtLocation']['id'],
  ) => {
    updateCourtLocation({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit CourtLocation {courtLocation?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CourtLocationForm
          courtLocation={courtLocation}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
};
