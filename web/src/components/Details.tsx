import { Link } from '@redwoodjs/router';

type Props = {
  referenceTarget: { id: string; name?: string | React.ReactNode };
  routeToDetails: (id: string) => string;
  routeToEdit: (id: string) => string;
  onDelete: (id: string) => void;
};
export const Details = (props: Props) => {
  const {
    referenceTarget: { id, name },
    routeToDetails,
    routeToEdit,
    onDelete,
  } = props;
  return (
    <>
      <Link to={routeToDetails(id)} title={'Show ' + id} className="rw-button">
        {name ?? id}
      </Link>
      <nav className="rw-table-actions">
        <Link
          to={routeToEdit(id)}
          title={'Edit ' + id}
          className="rw-button rw-button-small rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          title={'Delete ' + id}
          className="rw-button rw-button-small rw-button-red"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </nav>
    </>
  );
};
