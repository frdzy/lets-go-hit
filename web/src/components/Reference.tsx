import { Link } from '@redwoodjs/router';

type Props = {
  isImmutable?: boolean;
  referenceTarget?: { id: string; name?: string };
  routeToCreate?: () => string;
  routeToDetails?: (id: string) => string;
};
export const Reference = (props: Props) => {
  const { isImmutable, referenceTarget, routeToCreate, routeToDetails } = props;
  if (referenceTarget) {
    return (
      <>
        <Link
          to={routeToDetails ? routeToDetails(referenceTarget.id) : ''}
          title={'Show ' + referenceTarget.id}
          className="rw-button"
        >
          {referenceTarget.name ?? referenceTarget.id}
        </Link>
        {isImmutable ? null : (
          <nav className="rw-table-actions">
            <button
              type="button"
              title={'Unlink from a connection'}
              className="rw-button rw-button-small rw-button-red"
              onClick={() => {}}
            >
              Unlink
            </button>
          </nav>
        )}
      </>
    );
  }

  if (!routeToCreate) {
    return null;
  }

  return (
    <Link
      to={routeToCreate()}
      title={'Link to a connection'}
      className="rw-button rw-button-small rw-button-blue"
    >
      Link
    </Link>
  );
};
