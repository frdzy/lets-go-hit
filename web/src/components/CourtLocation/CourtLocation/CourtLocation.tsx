import type {
  DeleteCourtLocationMutationVariables,
  FindCourtLocationById,
} from 'types/graphql';

import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import {} from 'src/lib/formatters';

const DELETE_COURT_LOCATION_MUTATION = gql`
  mutation DeleteCourtLocationMutation($id: String!) {
    deleteCourtLocation(id: $id) {
      id
    }
  }
`;

interface Props {
  courtLocation: NonNullable<FindCourtLocationById['courtLocation']>;
}

const CourtLocation = ({ courtLocation }: Props) => {
  const [deleteCourtLocation] = useMutation(DELETE_COURT_LOCATION_MUTATION, {
    onCompleted: () => {
      toast.success('CourtLocation deleted');
      navigate(routes.courtLocations());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteCourtLocationMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete courtLocation ' + id + '?')) {
      deleteCourtLocation({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            CourtLocation {courtLocation.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{courtLocation.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{courtLocation.name}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{courtLocation.address}</td>
            </tr>
            <tr>
              <th>Notes</th>
              <td>{courtLocation.notes}</td>
            </tr>
            <tr>
              <th>Added by id</th>
              <td>{courtLocation.addedById}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editCourtLocation({ id: courtLocation.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(courtLocation.id)}
        >
          Delete
        </button>
      </nav>
    </>
  );
};

export default CourtLocation;
