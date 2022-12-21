import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import CourtLocationForm from 'src/components/CourtLocation/CourtLocationForm';

import type { CreateCourtLocationInput } from 'types/graphql';

const CREATE_COURT_LOCATION_MUTATION = gql`
  mutation CreateCourtLocationMutation($input: CreateCourtLocationInput!) {
    createCourtLocation(input: $input) {
      id
    }
  }
`;

const NewCourtLocation = () => {
  const [createCourtLocation, { loading, error }] = useMutation(
    CREATE_COURT_LOCATION_MUTATION,
    {
      onCompleted: () => {
        toast.success('CourtLocation created');
        navigate(routes.courtLocations());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (input: CreateCourtLocationInput) => {
    createCourtLocation({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New CourtLocation</h2>
      </header>
      <div className="rw-segment-main">
        <CourtLocationForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewCourtLocation;
