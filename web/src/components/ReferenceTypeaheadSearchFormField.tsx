import { SelectField } from '@redwoodjs/forms';
import { Link } from '@redwoodjs/router';

type ReferenceTarget = { id: string; name?: string };
type Props = {
  name: string;
  preloadedResults?: ReadonlyArray<ReferenceTarget>;
  isImmutable?: boolean;
  referenceTarget?: ReferenceTarget;
  routeToCreate?: () => string;
  routeToDetails?: (id: string) => string;
};
export const ReferenceTypeaheadSearchFormField = (props: Props) => {
  const {
    name,
    preloadedResults,
    isImmutable,
    referenceTarget,
    routeToCreate,
    routeToDetails,
  } = props;
  if (referenceTarget) {
    return (
      <div className="rw-segment rw-input">
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
      </div>
    );
  }

  return (
    <div className="rw-segment rw-input">
      <SelectField name={name}>
        {(preloadedResults ?? []).map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </SelectField>
    </div>
  );
  if (!routeToCreate) {
    return null;
  }

  return (
    <div className="rw-segment rw-input">
      <Link
        to={routeToCreate()}
        title={'Link to a connection'}
        className="rw-button rw-button-small rw-button-blue"
      >
        Link
      </Link>
    </div>
  );
};
