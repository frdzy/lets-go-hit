import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/CourtLocation/CourtLocationsCell';
import { CreatorReference } from 'src/components/CreatorReference';
import { Details } from 'src/components/Details';
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
            <th>Name</th>
            <th>Address</th>
            <th>Notes</th>
            <th>Added by</th>
          </tr>
        </thead>
        <tbody>
          {courtLocations.map((courtLocation) => (
            <tr key={courtLocation.id}>
              <td>
                <Details
                  referenceTarget={courtLocation}
                  routeToDetails={(id) => routes.courtLocation({ id })}
                  routeToEdit={(id) => routes.editCourtLocation({ id })}
                  onDelete={onDeleteClick}
                />
              </td>
              <td>{truncate(courtLocation.address)}</td>
              <td>{truncate(courtLocation.notes)}</td>
              <td>
                <CreatorReference referenceTarget={courtLocation.addedBy} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourtLocationsList;
