import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/CourtLocation/CourtLocationsCell';
import { truncate } from 'src/lib/formatters';

import type {
  DeleteCourtLocationMutationVariables,
  FindCourtLocations,
} from 'types/graphql';

const DELETE_COURT_LOCATION_MUTATION = gql`
  mutation DeleteCourtLocationMutation($id: String!) {
    deleteCourtLocation(id: $id) {
      id
    }
  }
`;

const CourtLocationsList = ({ courtLocations }: FindCourtLocations) => {
  const [deleteCourtLocation] = useMutation(DELETE_COURT_LOCATION_MUTATION, {
    onCompleted: () => {
      toast.success('CourtLocation deleted');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  });

  const onDeleteClick = (id: DeleteCourtLocationMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete courtLocation ' + id + '?')) {
      deleteCourtLocation({ variables: { id } });
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Address</th>
            <th>Notes</th>
            <th>Added by id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {courtLocations.map((courtLocation) => (
            <tr key={courtLocation.id}>
              <td>{truncate(courtLocation.id)}</td>
              <td>{truncate(courtLocation.name)}</td>
              <td>{truncate(courtLocation.address)}</td>
              <td>{truncate(courtLocation.notes)}</td>
              <td>{truncate(courtLocation.addedById)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.courtLocation({ id: courtLocation.id })}
                    title={'Show courtLocation ' + courtLocation.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editCourtLocation({ id: courtLocation.id })}
                    title={'Edit courtLocation ' + courtLocation.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete courtLocation ' + courtLocation.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(courtLocation.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourtLocationsList;
