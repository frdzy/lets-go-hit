import type { OpenSchedulesQuery } from "types/graphql";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";
import ReservationCell from "src/components/ReservationCell";
import { useCallback } from "react";
import { DateLabel } from "src/components/date";

export const QUERY = gql`
  query OpenSchedulesQuery {
    schedules {
      id
      beginTimestamp
      createdByUser {
        id
        name
      }
      reservation {
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
  const handleSchedule = useCallback(() => {
    console.log("WIP");
  }, []);
  return (
    <ul>
      {schedules.map((item) => {
        return (
          <article key={item.id}>
            <header>
              <h2>
                <DateLabel isoTimestamp={item.beginTimestamp} /> with{" "}
                {item.createdByUser.name ?? "Unknown Player"}
              </h2>
            </header>
            {item.reservation ? (
              <ReservationCell id={item.reservation.id} />
            ) : (
              <div>No Reservation</div>
            )}
            <button onClick={handleSchedule}>Schedule</button>
          </article>
        );
      })}
    </ul>
  );
};
