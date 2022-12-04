import type { OpenSchedulesQuery } from "types/graphql";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";

export const QUERY = gql`
  query OpenSchedulesQuery {
    schedules {
      id
      beginTimestamp
      createdByUser {
        id
      }
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: "red" }}>Error: {error?.message}</div>
);

export const Success = ({
  schedules,
}: CellSuccessProps<OpenSchedulesQuery>) => {
  return (
    <ul>
      {schedules.map((item) => {
        return (
          <li key={item.id}>
            <textarea>{JSON.stringify(item, null, 2)}</textarea>
          </li>
        );
      })}
    </ul>
  );
};
